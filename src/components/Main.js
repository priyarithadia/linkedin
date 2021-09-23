import { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from './PostModal';
import {connect} from 'react-redux';
import { getArcticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");

    useEffect(() => {
        props.getArcticles()
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            return;
        }

        switch (showModal) {
            case "open":
                setShowModal('close');
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        };
    };
    return (
        <>
        {
            props.articles.length === 0 ?
            <p>There are no articles</p>
            :
        <Container>
            <ShareBox>
            <div>
                { props.user && props.user.photoURL ? (
                <img src = {props.user.photoURL} />
                 ) : (
                <img src="/images/user.svg" alt="" />
                 )}
                <button onClick = {handleClick} disabled={props.loading ? true : false}>Start a post</button>
            </div>

            <div>
                <button>
                    <img className="icons" src="/images/camera.png" alt="" />
                    <span>Photo</span>
                </button>

                <button>
                <img className="icons" src="/images/video.png" alt="" />
                    <span>Video</span> 
                </button>

                <button>
                <img className="icons" src="/images/date.png" alt="" />
                    <span>Event</span> 
                </button>

                <button>
                <img className="icons" src="/images/article.png" alt="" />
                    <span>Article</span> 
                </button>
            </div>
            </ShareBox>

            <Content>
                {
                    props.loading && <img src= './images/rings.svg' />
                }
                {props.articles.length > 0 &&
                props.articles.map((article, key ) => (
                <Article key = {key}>
                    <SharedActor>
                        <a>
                            <img src={article.actor.image} alt=""/>
                            <div>
                                <span>{article.actor.title}</span>
                                <span>{article.actor.description}</span>
                                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img className="more" src= "/images/more.png" alt="" />
                        </button>
                    </SharedActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                        <a>
                          { !article.sharedImg && article.video ? ( <ReactPlayer width={'100%'} url ={article.video}/>
                           ) :
                        (
                            article.sharedImg && <img src={article.sharedImg} alt="" />
                        )}
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt=""/>
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a>
                                {article.comments}
                            </a>
                        </li>
                    </SocialCounts>
                    <SocialActions>
                    <button>
                        <img className="main__icons" src="/images/like-icon.svg" alt=""/>
                        <span>Like</span>
                    </button>
                    <button>
                        <img className="main__icons" src="/images/speech-bubble.png" alt=""/>
                        <span>Comments</span>
                    </button>
                    <button>
                        <img className="main__icons" src="/images/share-link.png" alt=""/>
                        <span>Share</span>
                    </button>
                    <button>
                        <img className="main__icons" src="/images/send.png" alt=""/>
                        <span>Send</span>
                    </button>
                    </SocialActions>
                </Article>
                ))}
                </Content>
            <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
}
        </>
    )
}

const Container = styled.div`
grid-area: main;
`;

const CommonCard = styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow:  0 0 0 1px rgb( 0 0 0/ 15%), 0 0 0 rgb( 0 0 0/ 20%);
`;

const ShareBox = styled(CommonCard)`
display: flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px;
background: white;

div {
    button {
        outline: none;
        color: rgba( 0,0,0,0.6);
        font-size: 14px;
        line-height: 1.5;
        min-height: 48px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        font-weight: 600;
    }

    .icons {
        height:  30px;
        width: 30px;
    }

    &:first-child {
        display: flex;
        align-items: center;
        padding: 8px 16px 0px 16px;

        img {
            width: 48px;
            border-radius: 50%;
            margin-right: 8px;
        }

        button{
            margin: 4px 0;
            flex-grow: 1;
            border-radius: 35px;
            padding: 16px;
            border: 1px solid rgba(0,0,0,0.15);
            background-color: white;
            text-align: left;
        }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;  
      justify-content: space-around;
      padding-bottom: 4px;
    }

    button {
        img {
            margin: 0 4px 0 -2px;
        }
        span {
           color: #70b5f9;
        }
    }
}
`;

const Article = styled(CommonCard)`
padding: 0;
margin: 0 0 8px;
overflow: hidden;
`;

const SharedActor = styled.div`
padding-right: 40px;
flex-wrap: no-wrap;
padding: 12px 14px 0;
margin-bottom: 8px;
align-items: center;
display: flex;
a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
        width: 48px;
        height: 48px;
    }

    & > div {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-basis:0;
        margin-left: 8px;
        overflow: hidden;

        span {
            text-align: left;
            &:first-child {
                font-size: 14px;
                font-weight: 700;
                color: rgba(0,0,0,1);
            }

            &:nth-child(n+1) {
                font-size: 12px;
                color: rgba(0,0,0,0.6);
            }
        }
    }
}

button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;

}

.more{
    height: 30px;
    width: 30px;
}
`;

const Description = styled.div`
padding: 0 16px;
overflow: hidden;
color: rgba(0 ,0, 0, 0.9);
font-size: 14px;
text-align: left;
`;

const SharedImg = styled.div`
margin-top: 8px;
width: 100%;
display: block;
position: relative;
background-color: #f9fafb; 

img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
`;

const SocialCounts = styled.ul`
line-height: 1.3;
display: flex;
align-items: flex-start;
overflow: hidden;
margin: 0 16px;
padding: 8px 0;
border-bottom:  1px solid #e9e5df;
list-style: none;
li {
   margin-right :5px ;
   font-size: 12px;
   button {
       display: flex;
       border: none;
       background-color: white;

   }
}
`;

const SocialActions = styled.div`
border: none;
background-color: transparent;
align-items: center;
display: flex;
justify-content: flex-start;
margin: 0;
min-height: 40px;
padding: 4px 8px;
 .main__icons {
     height: 38px;
     width: 38px;
    
 }
 button {
     display: inline-flex;
     align-items: center;
     padding: 8px;
     color: #0a0a0a;
     border: none;
     background-color: white;


     @media(min-width: 768px){
         span {
             margin-left: 8px;
         }
     }
 }
`;

const Content = styled.div`
text-align: center;
 & > img {
     width: 30px;
 }
`;
 
const mapStateToProps = (state) => {
  return {
      loading: state.articleState.loading,
      user: state.userState.user,
      articles: state.articleState.articles,
  }  
}

const mapDispatchToProps = (dispatch) => ({
    getArcticles: () => dispatch(getArcticlesAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps) (Main)