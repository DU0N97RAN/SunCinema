import React from "react";
import styles from "./TickitPrice.module.scss";
type Props = {};

const TickitPrice = (props: Props) => {
  return (
    <div className="mx-auto w-[1200px] my-14">
      <h2 className="uppercase text-3xl text-center mt-10 font-bold text-white">
        Giá vé
      </h2>
      <div className="border-b-[3px] border-orange-600 mx-auto w-16 mt-2"></div>
      <div className="text-center text-[#949494] mt-5 text-2xl">
        <h3 className="uppercase text-[#e7e7e7]">Giá vé xem phim </h3>
        <p>(Áp dụng từ ngày 01/01/2022)</p>
      </div>
      <table className={styles.tick_price}>
        <thead>
          <tr>
            <th className="w-72" rowSpan={2}></th>
            <th className="bg-[#044cb7]" colSpan={3}>
              Từ thứ 2 đến thứ 6
            </th>
            <th className="bg-red-600 text-white" colSpan={3}>
              Thứ 7, CN và ngày Lễ
            </th>
          </tr>
          <tr className="bg-[#2a2a2a]">
            <th className="w-[150px] text-white">Ghế thường</th>
            <th className="w-[150px] text-red-600">Ghế VIP</th>
            <th className="w-[150px] text-pink-600">Ghế đôi</th>
            <th className="w-[150px] text-white">Ghế thường</th>
            <th className="w-[150px] text-red-600">Ghế VIP</th>
            <th className="w-[150px] text-pink-600">Ghế đôi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-white">Trước 12:00</td>
            <td className="text-white">45.000</td>
            <td className="text-red-600">55.000</td>
            <td className="text-pink-600">110.000</td>
            <td className="text-white">60.000</td>
            <td className="text-red-600">70.000</td>
            <td className="text-pink-600">140.000</td>
          </tr>
          <tr>
            <td className="text-white">Từ 12:00 đến trước 18:00</td>
            <td className="text-white">60.000</td>
            <td className="text-red-600">65.000</td>
            <td className="text-pink-600">130.000</td>
            <td className="text-white">70.000</td>
            <td className="text-red-600">75.000</td>
            <td className="text-pink-600">150.000</td>
          </tr>
          <tr>
            <td className="text-white">Từ 18:00 đến 22:30</td>
            <td className="text-white">70.000</td>
            <td className="text-red-600">75.000</td>
            <td className="text-pink-600">150.000</td>
            <td className="text-white">80.000</td>
            <td className="text-red-600">85.000</td>
            <td className="text-pink-600">170.000</td>
          </tr>
          <tr>
            <td className="text-white">Sau 22:30</td>
            <td className="text-white">55.000</td>
            <td className="text-red-600">55.000</td>
            <td className="text-pink-600">110.000</td>
            <td className="text-white">65.000</td>
            <td className="text-red-600">65.000</td>
            <td className="text-pink-600">130.000</td>
          </tr>
        </tbody>
      </table>

      <div className="text-white">
        * Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá
        45.000đ/vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6 (chỉ áp
        dụng cho hình thức mua vé trực tiếp tại quầy, mỗi thẻ U22 mua được 1 vé
        - vui lòng xuất trình thẻ U22 khi mua vé); Không áp dụng ưu đãi vào các
        ngày 20/10, 20/11, các ngày Lễ, Tết, suất chiếu sớm và suất chiếu đặc
        biệt.
      </div>

      <div className="my-10 text-white">
        *Special promotion for student who is 22 years old and under: From
        Monday to Friday 45.000đ/2D ticket for all slot times (only apply for
        direct purchase at the ticket stall, one U22 card can buy one ticket,
        student should show their U22 card to get this priority); Do not apply
        promotion in the day 20/10, 20/11, holidays, sneak show and special
        show.
      </div>

      <div className="border-b-2 border-[#ccc] mx-auto w-1/2"></div>

      <div className="mt-10 grid grid-cols-2 gap-10 mb-20 text-white">
        <div>
          <p className="mb-5">
            <span className="font-bold">* Ghế vip </span>là các ghế có vị trí
            ngồi xem tốt nhất trong rạp. <br /> Vip seats are the best positions
            in the cinema.
          </p>
          <p className="mb-5">
            <span className="font-bold">* Vé trẻ em:</span>
            <br /> - Trẻ em có chiều cao từ 0,7m đến 1,3m: Giảm 10.000đ/vé đối
            với phim 2D, 3D.
            <br /> - Trẻ em dưới 0,7m đi kèm với người lớn được miễn phí.
          </p>
          <p className="mb-5">
            Children’s ticket:
            <br /> - Children from 0.7m to 1.3m: discount 10.000/2D, 3D ticket.
            <br /> - Children under 0.7m accompanied by adult have free ticket.
          </p>
          <p className="mt-10">
            <span className="font-bold">
              * Ưu đãi cho người cao tuổi (trên 55 tuổi): Giảm 10.000đ/vé
            </span>{" "}
            đối với phim 2D (yêu cầu xuất trình CMND để hưởng giá vé ưu đãi).
            <br /> Senior over 55 years old: Discount 10.000/2D ticket.
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">
              * Áp dụng giá vé ngày Lễ, Tết cho các ngày:
            </span>
            <br /> - Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết
            Nguyên Đán, Tết Dương
            <br />
            Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, nghỉ lễ Quốc
            Khánh 2/9.
            <br />- Các ngày: 14/2, 8/3, 24/12.
            <br />- Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
            <br />
          </p>
          <p className="my-10">
            <span className="font-bold">* Holiday fare is applied on:</span>
            <br />- The public holidays as prescribed by state: New year, Lunar
            new year, Hùng's King festival (March 10th - lunar calendar) , April
            30th, May 1st, National Day holiday on September 2nd.
            <br />- Days: Valentine, Women's Day, Noel.
            <br />- Compensatory days off due to holidays coinciding with
            Saturday and Sunday.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TickitPrice;
