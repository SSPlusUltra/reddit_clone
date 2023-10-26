import PostDisplay from "./displaypost"
import CommunityPost from "./community-post";
const HomePage = (props)=>{
    if (props.pdata.length === 0) {
        return <p>No posts available. Click on subreddit button on top right and make posts in subreddits to see the posts here.</p>;
      }

return(
  <div>
    <br></br>
   
    <CommunityPost/>
    <br></br>
        {props.pdata.map((post) => (
          <PostDisplay
        v1={post.title}
        v2={post.description}
        v3={post.pid}
        v4={post.vote}
        v5={post.id}
        UpclickHandler = {props.Uv}
        DownclickHandler = {props.Dv}
        upress = {post.upvotepressed}
        dpress = {post.downvotepressed}
        key={post.pid}
      />
        ))}
        </div>
      )
}

export default HomePage