import { useState } from "react";
import { AiOutlineHistory } from "react-icons/all";
//pics
import bitcoinPic from "../../assets/images/BitCoin_ICON.png";
import lightcoinPic from "../../assets/images/LightCoin_ICON.png";

//components
import CustomizedTable from "../../components/table/Table";

export default function OpenOrdersPage() {
  document.title = "ارز تو ارز | سفارشات باز";
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="card-style p-3 h-100">
      <div className="d-flex justify-content-between pb-3 align-items-center border-bottom-lightGray ">
        <div className="d-flex align-items-center text-blue-medium yekan-Bold ">
          <AiOutlineHistory size={24} className=" ml-2 " />
          <div className="is-size-4 yekan-Bold">تاریخچه سفارشات باز</div>
        </div>
      </div>

      <div className="mt-5">
        <CustomizedTable
          header={
            <>
              <th className=" yekan-Light is-size-6">جفت ارز</th>
              <th className=" yekan-Light is-size-6">تاریخ</th>
              <th className=" yekan-Light is-size-6">مقدار</th>
              <th className=" yekan-Light is-size-6">نوع سفارش</th>
              <th className=" yekan-Light is-size-6">مبلغ سفارش</th>
              <th className=" yekan-Light is-size-6">کارمزد</th>
              <th className=" yekan-Light is-size-6">مبلغ کل</th>
            </>
          }
          totalRecords={97}
          pageLimit={10}
          onChangePage={(page) => setCurrentPage(page)}
          excel
        >
          {[...Array(10)].map((item, index) => {
            return (
              <>
                <tr key={index}>
                  <td>
                    <span className="CurrencyPairs">
                      <img src={bitcoinPic} />
                      <img src={lightcoinPic} />
                    </span>
                    <span className="mr-2 yekan-Medium is-size-7">
                      BTC / LTC
                    </span>
                  </td>

                  <td className="is-size-7 yekan-Medium">
                    ۱۳۹۹/۱۰/۱۴<span className="text-gainsboro mx-2">|</span>
                    ۱۳:۳۱:۴۸
                  </td>
                  <td className="is-size-7 yekan-Medium">
                    ۰.۷۲۱۷۲۶,۲۰۰{" "}
                    <span className="text-gainsboro is-size-7 mr-1">تومان</span>
                  </td>
                  <td className="is-size-7 yekan-Medium">
                    {index % 5 === 0 ? (
                      <span className="text-secondary">تبدیل</span>
                    ) : index % 2 === 0 ? (
                      <span className="text-success">خرید</span>
                    ) : (
                      <span className="text-danger">فروش</span>
                    )}
                  </td>
                  <td className="is-size-7 yekan-Medium">۲۹۶,۷۲۶,۲۰۰</td>
                  <td className="is-size-7 yekan-Medium">۲ ,۱۰۰,۰۰۰</td>
                  <td className="is-size-7 yekan-Medium">۲۹۶,۷۲۶,۲۰۰</td>
                </tr>
              </>
            );
          })}
        </CustomizedTable>
      </div>
    </div>
  );
}
