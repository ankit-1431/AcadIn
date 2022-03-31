import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import "./rightbar.css";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Rightbar() {
  const [followings,setFollowings]=useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(async()=>{
    if (!currentUser) return;

    const followingList = await axios.get(`http://localhost:5000/user/friends/${currentUser._id}`);
    console.log(followingList.data);
    setFollowings(followingList.data);
}, [currentUser]);
  return (
    <div className="rightbar">
       <div className="rightbarWrapper">
         <h4 className="rightbarTitle">Online Friends</h4>
         <ul className="rightbarFriendList">
           <li className="rightbarFriend">
             {/* <div className="rightbarProfileImgContainer">
               <img className='rightbarProfileImg' alt=""/>
              <span className='rightbarOnline'></span> 
             </div>
             <span className="rightbarUsername">Aunik Kumar</span> */}
             {
                                            followings.map((friend) => 
                                            <div key={friend._id}className="rightbarProfileImgContainer">
                                                <img src={friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "noAvatar.png"} alt="" className='rightbarProfileImg' />
                                                <Link to={`/profile/${friend._id}`} ><span className="rightbarUsername" style={{textDecoraton:"none"}}>{friend.username}</span></Link>
                                            </div>
                                            )
                                        }
           </li>   
         </ul>
       </div>
    </div>
  )
}