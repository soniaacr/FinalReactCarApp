import Background from '../assets/images/pinkcar.jpg'

function Home() {
  return (
    <div 
      style={{ backgroundImage: `url(${ Background })`}} 
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex place-items-center h-screen'>
      <h1 className="font-extrabold text-white my-10">WELCOME TO THE FUTURE OF CAR SHOPPING</h1>
        </div>
    </div>
  )
}

export default Home