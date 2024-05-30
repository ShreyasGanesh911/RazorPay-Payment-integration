function App() {
  const handleClick = async(e)=>{
    e.preventDefault();
    const body = {
      amount:500
    }
    e.preventDefault()
    try{
        const response = await fetch('http://localhost:4000/payment/checkout',{
          method:"POST",
          credentials:'same-origin',
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        })
        const {order,key} = await response.json()
        console.log(order.id)
        const options = {
          key, 
          amount: order.amount, 
          currency: "INR",
          name: "Test 123",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.id, 
          callback_url: "http://localhost:4000/payment/verify",
          prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000"
          },
          notes: {
              "address": "Razorpay Corporate Office"
          },
          theme: {
              "color": "#3399cc"
          }
      }; 
        const razor= new window.Razorpay(options);
        razor.open();
   


    }catch(e){
      console.log(e)
    }
  }
  return (
    < >
      <section className="page bg-pink-50 flex justify-center items-center">
        <div className="w-96 h-96 bg-white">
          <div className="h-3/4 w-full bg-red-500"></div>
          <div className="h-1/4 w-full bg-blue-100 flex justify-center items-center">
            <button className="p-3 border bg-black text-white rounded hover:bg-slate-700" onClick={handleClick}>CheckOut</button>
          </div>
        </div>
        </section>    

    </>
  );
}

export default App;
