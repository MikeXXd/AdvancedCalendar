import { createPortal } from "react-dom";
import img from "../icon/linkedin_icon.png";
import { useState } from "react";

interface ModalAboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAbout({ isOpen, onClose }: ModalAboutProps) {
  const [isVisiblePrompt, setIsVisiblePrompt] = useState(false);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          {" "}
          <div>About App</div>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>

        <div className="modal-body-about">
          <ul>
            <li>
              <em>Name:</em> Advanced Calendar App &#10088; React,TS &#10089;
            </li>
            <li>
              <em>Status:</em> Development in progress, some minor features
              might be currently out of service
            </li>
            <li>
              <em>Created by:</em> Michal Viliš, Frýdlant nad Otravicí, 8/2023,
              Czech Republic
            </li>
            <li>
              <a
                onMouseOver={() => setIsVisiblePrompt(true)}
                onMouseOut={() => setIsVisiblePrompt(false)}
                href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/"
              >
                {" "}
                <span>
                  <em>More about me at&nbsp;</em>
                </span>
                <span>
                  <img
                    className={`${isVisiblePrompt && "active"}`}
                    src={img}
                    alt="linkedin icon"
                  />
                </span>
                <span
                  className={`display-prompt ${isVisiblePrompt && "active"}`}
                >
                  <em>&nbsp;check it out</em>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.createElement("div")
  );
}
