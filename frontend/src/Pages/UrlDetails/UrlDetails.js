import React, { useState } from "react";
import style from "./UrlDetails.module.css";

import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { IconButton, Link, Box, Backdrop } from "@mui/material";
import {
  UilCopy,
  UilQrcodeScan,
  UilTwitterAlt,
  UilExternalLinkAlt,
} from "@iconscout/react-unicons";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";

import Input from "../../components/Input/Input";

// ChartJS.register(ArcElement, Tooltip, Legend);

const UrlDetails = ({ urlCode }) => {

  const { urlList } = useSelector((state) => state.app);
  const [isOpen, setIsOpen] = useState(false);

  const urlDetails = urlList.filter((url) => {
    if (url.urlCode === urlCode) return url;
  });

  const url = urlDetails[0];
  const copy = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <img src={url.webIcon} />
        <h2>{url.name}</h2>
      </div>
      <div className={style.head}>
        <div className={style.content}>
          <div className={style.input}>
            <p>
              <strong>Short Url :</strong>
            </p>
            <Input value={url.shortUrl} func={() => null} />
            <Link href={url.shortUrl} target="_blank">
              <IconButton>
                <UilExternalLinkAlt />
              </IconButton>
            </Link>
          </div>
          <div className={style.options}>
            <div>
              <p>Copy</p>
              <IconButton onClick={() => copy(url.shortUrl)}>
                <UilCopy />
              </IconButton>
            </div>
            <div>
              <p>QR Code</p>
              <IconButton onClick={() => setIsOpen((state) => !state)}>
                <UilQrcodeScan />
              </IconButton>
            </div>
            <div>
              <p>Share</p>
              <IconButton>
                <UilTwitterAlt />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={style.lognInput}>
          <p>
            <strong>Long Url :</strong>
          </p>{" "}
          <Input value={url.longUrl} func={() => null} />
          <Link href={url.longUrl} target="_blank">
            <IconButton>
              <UilExternalLinkAlt />
            </IconButton>
          </Link>
          <div>
            <p>Copy</p>
            <IconButton onClick={() => copy(url.shortUrl)}>
              <UilCopy />
            </IconButton>
          </div>
        </div>
      </div>
      <Backdrop open={isOpen} onClick={() => setIsOpen((state) => !state)}>
        <QRCode value={url.shortUrl} />
      </Backdrop>
      <Box sx={{ mt: 5 }}>
        <p>Total Clicks = {url.clicks}</p>
      </Box>
      {/* <div style={{width:"90px"}}>    
        <Pie data={data} />
      </div> */}
    </div>
  );
};

export default UrlDetails;
