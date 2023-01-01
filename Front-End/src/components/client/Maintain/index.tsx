import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from 'react-icons/bs'
import { useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
  isMaintain: number;
};

const Maintain = ({ children, isMaintain }: PrivateRouteProps) => {
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  let social = webConfigs[0]?.social?.filter((item: any) => item?.name !== "Email")
  let mail = webConfigs[0]?.social?.find((item: any) => item?.name === "Email")

  useEffect(() => {
    document.title = `${webConfigs[0]?.storeName}`
  }, [])
  const renderSocial = () => {
    return (
      <div className="flex gap-3 mt-3 text-2xl">
        {social && social?.map((item: any) => (
          <div key={item?._id}>
            <span className="pp-social-icon">
              <a itemProp="sameAs" href={item?.text} target="_blank" title={item?.name} aria-label={item?.name} role="button">
                {item?.name === "Facebook" ? <BsFacebook style={{ color: "gray", height: '30px' }} /> : <BsInstagram style={{ color: "gray", height: '30px' }} />}
              </a>
            </span>
          </div>
        ))}
      </div>
    )
  }

  const mainTainPage = () => {
    return (
      <>
        <div className="container">
          <div className="maintenance_contain">
            <img src="https://demo.wpbeaveraddons.com/wp-content/uploads/2018/02/main-vector.png" alt="maintenance" className="w-auto max-w-[100%] mx-auto" />
            <div className="grid gap-1 justify-items-center mt-3 leading-4">
              <span>WE ARE COMING SOON</span>
              <div>
                <h2 className="font-bold text-[2rem]">Scheduled system maintenance  </h2>
              </div>
              <div className="max-w-[50%] w-[50%] leading-5">
                <p>We will be conducting system maintenance on our systems next Saturday.
                  Maintenance is scheduled to begin Saturday, 19:00 UTC, and is expected to last up to one hour. The purpose is to improve the security and availability of our systems, as well as to enhance the overall performance and reliability of our services.
                  Please be aware that during this time, our systems may be temporarily offline. We apologize for any inconvenience this may cause and appreciate your patience as we work to improve our systems.</p>			</div>
              {mail && <span className="title-text pp-primary-title">If you have questions, reach out to <a href={`mailto:${mail.text}`}>{mail.text}</a></span>}
              {renderSocial()}
            </div>
          </div>
        </div>
      </>
    );
  };
  if (isMaintain) {
    return <>{mainTainPage()}</>;
  } else {
    return children;
  }
};

export default Maintain;
