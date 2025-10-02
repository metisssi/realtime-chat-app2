import Sidebar from "../../compontents/sidebar/sidebar"
import MessageContainer from "../../compontents/messages/MessageContainer"
function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer/> 


    </div>
  )
}

export default Home
