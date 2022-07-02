import React from "react";
import style from "./UrlContent.module.css";

import { IconButton, Link } from "@mui/material";
import {
  UilCopy,
  UilQrcodeScan,
  UilTwitterAlt,
  UilExternalLinkAlt,
} from "@iconscout/react-unicons";

import Input from "../Input/Input";

const UrlContent = ({ urlLink }) => {
  const copy = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={style.container}>
      <div className={style.input}>
        <h3>Short Url :</h3> <Input value={urlLink} func={() => null} />
        <Link href={`https://${urlLink}`} target="_blank" >
          <IconButton>
            <UilExternalLinkAlt />
          </IconButton>
        </Link>
      </div>
      <div className={style.options}>
        <div>
          <p>Copy</p>
          <IconButton onClick={() => copy(urlLink)}>
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
  );
};

export default UrlContent;
