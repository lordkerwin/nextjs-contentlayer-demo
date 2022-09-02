import { allPosts } from "contentlayer/generated"
import Image from "next/image"

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
  return { props: { posts } }
}


const Index = ({ posts }) => {
  return (
    <div>
      
      <div className="posts">
        <h1>Posts</h1>

        {posts.map((post, i) => (
          <div key={i} className="post">
            <div>
              <h2>{post.title}</h2>

              <span>{post.publishedAt}</span>

              {/* Loop through any tags if we have any */}
              <ul>
              {post.tags && post.tags.map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
              </ul>
            </div>

            
            { post.image && (
              <div style={{ width: '200px', position: 'relative', height: '100px' }}>
                <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
              </div>  
            )}

            {/* Post body */}
            <p>{post.body.raw}</p>
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default Index