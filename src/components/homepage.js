import PostDisplay from "./displaypost"
const HomePage = (props)=>{
    if (!props.postdata || props.postdata.length === 0) {
        return <p>No posts available. Click on subreddit button on top right and make posts in subreddits to see the posts here.</p>;
      }

return(
        props.postdata.map((post) => (
          <PostDisplay key={post.id} v1={post.title} v2={post.description} v3={post.id} v4={post.date}/>
        ))
      )
}

export default HomePage