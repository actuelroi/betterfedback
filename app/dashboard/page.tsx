

const Dashboard = () => {

    const items=[
        'Form', 'Checkout', 'CustomFeed'
    ]
  return (
    <section>
        <div className='grid grid-cols-1 md:grid-cols-3 p-4'>
            <div >
                <h1>Form</h1>
            </div>
            <div className='border-r border-l'>
                <h1>Checkout</h1>
            </div>
            <div className='flex'>
               <h1 className='justify-end'>CustomFeed</h1>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
