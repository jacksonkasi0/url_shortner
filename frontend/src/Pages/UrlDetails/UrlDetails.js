import React from "react";
import style from "./UrlDetails.module.css";

import { useSelector } from "react-redux";
import { IconButton, Link, Box } from "@mui/material";
import {
  UilCopy,
  UilQrcodeScan,
  UilTwitterAlt,
  UilExternalLinkAlt,
} from "@iconscout/react-unicons";

import Input from "../../components/Input/Input";

const UrlDetails = ({ urlCode }) => {
  const { urlList } = useSelector((state) => state.app);

  const urlDetails = urlList.filter((url) => {
    if (url.urlCode === urlCode) return url;
  });

  console.log(urlCode, urlDetails[0]);

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
              <IconButton>
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

      <Box sx={{ mt: 5 }}>
        <p>Total Clicks = {url.clicks}</p>
      </Box>
    </div>
  );
};

export default UrlDetails;
