 
export default function Brands() {
  return (
    <>
    
    {[1,2,3,4,5].map((_, i) => (
      <div key={i} className="text-2xl font-bold h-screen">brands</div>
    ))} 
    </>
  )
} 