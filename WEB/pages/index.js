import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMemo, useRef, useState } from "react";

const Section = ({ children }) => {
  return <div className={styles.sec}>{children}</div>;
};

let intervalY, intervalS;

export default function Home() {
  // 0 - idle
  // 1 - running
  // -1 - error
  // 2 - success
  const [loadingY, setLoadingY] = useState(0);
  const [loadingS, setLoadingS] = useState(0);
  const isLoading = useMemo(() => {
    return loadingY === 1 && loadingS === 1;
  }, [loadingS, loadingY]);

  const [resultY, setResultY] = useState("");
  const [resultS, setResultS] = useState("");

  const startCheckingStatus = () => {
    intervalY = setInterval(() => {
      fetch("/api/checkY")
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "OK") {
            const result = Buffer.from(res.data).toString("base64");
            setResultY(result);
            setLoadingY(2);
            clearInterval(intervalY);
          } else if (res.status === "ERROR") {
            setResultY("");
            setLoadingY(-1);
            clearInterval(intervalY);
          } else {
            console.log("YOLO NOT DONE");
          }
        });
    }, 5000);

    intervalS = setInterval(() => {
      fetch("/api/checkS")
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "OK") {
            const result = Buffer.from(res.data).toString("base64");
            setResultS(result);
            setLoadingS(2);
            clearInterval(intervalS);
          } else if (res.status === "ERROR") {
            setResultS("");
            setLoadingS(-1);
            clearInterval(intervalS);
          } else {
            console.log("SSD NOT DONE");
          }
        });
    }, 5000);
  };

  const onChange = (e) => {
    setLoadingY(1);
    setLoadingS(1);

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function () {
      const base64 = btoa(reader.result);

      fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({ base64 }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.msg === "OK") {
            return startCheckingStatus();
          }

          throw Error("");
        })
        .catch((err) => {
          setLoadingY(-1);
          setLoadingS(-1);
        });
    };
    reader.onerror = function () {
      console.log("there are some problems");
    };
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YOLOv1 vs SSD</title>
        <meta name="description" content="Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <h3>Sample results</h3>
        <p>
          Click <a href={"/sample.zip"}>here</a> to download the sample results.
        </p>
      </Section>
      <Section>
        <h3>Upload your image</h3>

        <table>
          <tbody>
            <tr>
              <td style={{ width: 120 }}>Your JPG file</td>
              <td>
                :{" "}
                <input
                  disabled={!!isLoading}
                  type={"file"}
                  accept={"image/jpg;image/jpeg"}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>YOLOv1 result</td>
              <td>
                : {loadingY === 0 && <div />}
                {loadingY === 1 && <div className="loader-text" />}
                {loadingY === -1 && <span style={{ color: "red" }}>X</span>}
                {loadingY === 2 && (
                  <a
                    download={"result_yolo.jpg"}
                    href={"data:image/jpg;base64," + resultY.toString("base64")}
                  >
                    Download
                  </a>
                )}
              </td>
            </tr>
            <tr>
              <td>SSD result</td>
              <td>
                : {loadingS === 0 && <div />}
                {loadingS === 1 && <div className="loader-text" />}
                {loadingS === -1 && <span style={{ color: "red" }}>X</span>}
                {loadingS === 2 && (
                  <a
                    download={"result_ssd"}
                    href={"data:image/jpg;base64," + resultS.toString("base64")}
                  >
                    Download
                  </a>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section>
        <h3>You Only Look Once v1 (YOLOv1)</h3>
        <ul>
          <li>Release date: June 2015</li>
          <li>
            Source code:{" "}
            <a
              rel={"noreferrer"}
              target={"_blank"}
              href={"https://github.com/lovish1234/YOLOv1"}
            >
              https://github.com/lovish1234/YOLOv1
            </a>
          </li>
          <li>Dataset: PASCAL VOC 2007+2012</li>
          <li>Backbone: Darknet</li>
        </ul>
      </Section>
      <Section>
        <h3>Single-Shot Detector (SSD)</h3>
        <ul>
          <li>Release date: December 2015</li>
          <li>
            Source code:{" "}
            <a
              rel={"noreferrer"}
              target={"_blank"}
              href={"https://github.com/lufficc/SSD"}
            >
              https://github.com/lufficc/SSD
            </a>
          </li>
          <li>Dataset: PASCAL VOC 2007+2012</li>
          <li>Backbone: VGG-16</li>
        </ul>
      </Section>
      <Section>
        <h3>Reasons</h3>
        <ul>
          <li>
            To compare the initial and core proposed algorithm respectively
          </li>
          <li>Released around the same time </li>
          <li>Limited classes - easier to do comparison</li>
          <li>Open source</li>
        </ul>
      </Section>
      <Section>
        <h3>PASCAL VOC 2007+2012</h3>
        <ul>
          <li>aeroplane</li>
          <li>bicycle</li>
          <li>bird</li>
          <li>boat</li>
          <li>bottle</li>
          <li>bus</li>
          <li>car</li>
          <li>cat</li>
          <li>chair</li>
          <li>cow</li>
          <li>diningtable</li>
          <li>dog</li>
          <li>horse</li>
          <li>motorbike</li>
          <li>person</li>
          <li>pottedplant</li>
          <li>sheep</li>
          <li>sofa</li>
          <li>train</li>
          <li>tvmonitor</li>
        </ul>
      </Section>
    </div>
  );
}
