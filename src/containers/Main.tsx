import axios from 'axios';
import React, { useEffect,useState } from 'react';
const api = 'https://shopdi-magento.herokuapp.com';


const Main = () => {
    const [totalSeller,setTotalSeller]= useState(0);
    const [totalSellerNew,setTotalSellerNew]= useState(0);
    const [totalSku,setTotalSku]= useState(0);
    const [totalSkuNew,setTotalSkuNew]= useState(0);
    const [totalOrder,setTotalOrder]= useState(0);
    const [totalOrderSuccess,setTotalOrderSuccess]= useState(0);
    const [totalOrderFailed,setTotalOrderFailed]= useState(0);
    const [totalMoney,setTotalMoney]= useState(0);
    const [isLoading,setIsLoading]= useState(false);


    const fetchSeller = async() =>{
        try {
                setIsLoading(true);
            const result = await axios.get(api);
            if(result){
                console.log(result);
                setTotalSeller(result.data?.[0]?.[0]?.totalRecords)
                setTotalSellerNew(result.data?.[1]?.[0]?.totalRecords)
                setTotalSku(result.data?.[2]?.total_count);
                setTotalSkuNew(result.data?.[3]?.total_count);
                setTotalOrder(result.data?.[4]?.total_count);
                setTotalOrderSuccess(result.data?.[5]?.total_count);
                setTotalOrderFailed(result.data?.[6]?.total_count);
                const tempList = result.data?.[7]?.items;
                const total = (tempList ?? []).reduce((a:any,b:any) => {
                return a + (b?.base_grand_total ?? 0)
                },0)
                setTotalMoney(total);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }   
    useEffect(() =>{
        fetchSeller();
    },[])


  return (
    <div>
        <header className="App-header">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <h3>
          <a
            className="App-link"
            href="https://shopdi.com.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            shopdi.com.vn
          </a>
        </h3>
        <h1 className="text-center">B??O C??O S??? LI???U</h1>
        <h2>T??? ng??y 01/01/2022 ??? ?????n th???i ??i???m truy c???p</h2>
      </header>
      <div className='mt-3 table-main'>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>S??? l?????ng truy c???p:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : Math.floor((new Date().getTime() - 1659410000000) / 10000)}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng s??? ng?????i b??n:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalSeller}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>S??? l?????ng ng?????i b??n m???i:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalSellerNew}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng s??? s???n ph???m (SKU):</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalSku}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>S??? s???n ph???m ????ng b??n m???i:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalSkuNew}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng s??? ????n h??ng:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalOrder}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng s??? ????n h??ng th??nh c??ng:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalOrderSuccess}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng s??? ????n h??ng kh??ng th??nh c??ng:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : totalOrderFailed}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>T???ng gi?? tr??? giao d???ch th??nh c??ng:</div>
                    <div>{isLoading ? '??ang l???y d??? li???u' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}</div>
            </div>

      </div>
    </div>
  )
}

export default Main;
