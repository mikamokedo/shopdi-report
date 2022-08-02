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
        <h1 className="text-center">BÁO CÁO SỐ LIỆU</h1>
        <h2>Từ ngày 01/01/2022 – đến thời điểm truy cập</h2>
      </header>
      <div className='mt-3 table-main'>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Số lượng truy cập:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : Math.floor((new Date().getTime() - 1659410000000) / 10000)}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng số người bán:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalSeller}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Số lượng người bán mới:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalSellerNew}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng số sản phẩm (SKU):</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalSku}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Số sản phẩm đăng bán mới:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalSkuNew}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng số đơn hàng:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalOrder}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng số đơn hàng thành công:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalOrderSuccess}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng số đơn hàng không thành công:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : totalOrderFailed}</div>
            </div>
            <div className='d-flex mb-3'>
                    <div className='w-70 font-bold text-left'>Tổng giá trị giao dịch thành công:</div>
                    <div>{isLoading ? 'đang lấy dữ liệu' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}</div>
            </div>

      </div>
    </div>
  )
}

export default Main;
