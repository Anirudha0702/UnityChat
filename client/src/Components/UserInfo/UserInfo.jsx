import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../db/Firebase/firebase";
import { Auth } from "../../Providers/AuthProvider";
import { GetUser, Search } from "../../UseHooks";
import follow from "../../utils/follow";
import unFollow from "../../utils/unFollow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { PiChatsCircleFill } from "react-icons/pi";
import { RiHeartAddFill } from "react-icons/ri";
const UserInfo = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(Auth);
  const [id, setID] = useState(undefined);
  const [searchString, setSearchString] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setID(currentUser?.uid);
  }, [currentUser?.uid]);
  const { data: userInfo, isLoading, isError, error } = GetUser(id);
  const { data: searchedUsers } = Search(searchString);
  const handleClick = (uid) => {
    setSearchString("");
    setID(uid);
  };
  const signout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const followUser = useMutation({
    mutationFn: () => {
      return follow(userInfo?.uid, currentUser?.uid);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["Users", userInfo?.uid], data);
    },
  });
  const unFollowUser = useMutation({
    mutationFn: () => {
      return unFollow(userInfo?.uid, currentUser?.uid);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["Users", userInfo?.uid], data);
    },
  });
  const handleFollowUnfollow = async () => {
    if (processing) return;
    setProcessing(!processing);
    if (!userInfo?.followers?.includes(currentUser?.uid)) {
      followUser.mutate(
        {},
        {
          onSuccess: () => {
            console.log("Success follow");
            setProcessing(false);
          },
          onError: () => {
            setProcessing(false);
          },
        }
      );
    } else {
      unFollowUser.mutate(
        {},
        {
          onSuccess: () => {
            console.log("Success unfollow");
            setProcessing(false);
          },
          onError: () => {
            setProcessing(false);
          },
        }
      );
    }
  };
  if (isError) return <h1>{error.message}</h1>;
  if (isLoading || !userInfo) {
    return (
      <div className=" h-[100svh] gap-4 relative flex flex-col w-full sm:w-80 justify-start">
        <div className=" flex flex-col gap-4 w-72">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex flex-col gap-4 w-72">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }
  if (isError)
    return (
      <div className="user-info">
        <h1>{error.message}</h1>
      </div>
    );
  return (
    <div className="relative flex flex-col w-full sm:w-80 justify-start  h-[100svh]">
      <div
        className={`absolute top-2 left-1/2 flex w-[90%] -translate-x-1/2 p-2 items-center ${
          searchedUsers === undefined || searchedUsers === ""
            ? "rounded-full"
            : "rounded-t-xl"
        }  z-10 bg-white `}
      >
        <input
          type="text"
          placeholder="Enter Name or Email"
          className="w-full p-2 focus:outline-none bg-transparent border-none text-gray-500"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div className="absolute w-[90%] flex flex-col z-10 top-12 bg-white left-1/2 -translate-x-1/2">
        {searchedUsers?.map((user) => {
          return (
            <div
              className="flex gap-2 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"
              key={user?.uid}
              onClick={() => {
                handleClick(user?.uid);
              }}
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <div className="info">
                <h3>{user?.displayName}</h3>
                {/* <h5>{user.email}</h5> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative w-full h-56">
        <img
          src={userInfo?.coverURL}
          alt=" cover image"
          className="absolute h-full w-full object-cover"
        />
        <div className="flex flex-col absolute z-10 bottom-0 right-1">
          <Link to="#">
            <PiChatsCircleFill size={40} color="white"/>
          </Link>
          <Link to ="/status">
            <RiHeartAddFill size={40} color="red"/>
          </Link>
        </div>
      </div>
      <div className="-mt-12 pl-2 flex flex-wrap gap-2  items-end ">
        <div className="avatar ">
          <div className="w-32 rounded-full">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">{userInfo?.displayName}</h1>
          <h3 className="text-lg font-semibold">{userInfo?.email}</h3>
        </div>
      </div>

      <div className="collapse bg-base-200 my-2 ">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Bio</div>
        <div className="collapse-content">
          <p>
            {userInfo?.about}Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Iure, similique dignissimos labore mollitia nostrum obcaecati
            reiciendis vel, necessitatibus quis deserunt, sint placeat dolore
            ratione magni. Fugiat, est. Cupiditate, hic quos.
          </p>
        </div>
      </div>
      <div className="relative mt-2 flex justify-around gap-4items-center">
        <span className="block text-center w-[45%] border-2 border-blue-500 p-1 rounded-full px-2">
          {userInfo?.followersCount} Followers
        </span>
        {userInfo?.uid === currentUser?.uid ? (
          <button
            className="btn w-[45%] btn-sm  btn-error rounded-full"
            onClick={signout}
          >
            SignOut
          </button>
        ) : processing ? (
          <button className="btn btn-sm rounded-full w-[45%]">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        ) : (
          <button className="btn w-[45%] btn-sm rounded-full bg-blue-500 hover:text-blue-500" onClick={(e) => handleFollowUnfollow(e)}>
            {userInfo?.followers.includes(currentUser?.uid)
              ? "Unfollow"
              : "Follow"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
