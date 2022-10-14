import * as fs from "fs";
import * as child_process from "child_process";

const { exec } = child_process;

export default async function handler(req, res) {
  const base64 = JSON.parse(req.body).base64;

  // Delete File Sync

  const deletion = [
    () => fs.promises.unlink("../YOLOv1/test/input.jpg"),
    () => fs.promises.unlink("../YOLOv1/test/output.jpg"),
    () => fs.promises.unlink("../SSD/demo/input.jpg"),
    () => fs.promises.unlink("../SSD/demo/result/input.jpg"),
  ].map((p) => p().catch((e) => undefined));
  await Promise.all(deletion);

  // Write File Sync

  const addition = [
    () => fs.promises.writeFile("../YOLOv1/test/input.jpg", base64, "base64"),
    () => fs.promises.writeFile("../SSD/demo/input.jpg", base64, "base64"),
  ].map((p) => p().catch((e) => undefined));
  await Promise.all(addition);

  // Execute Shell file

  exec("bash run_ssd.sh", (error) => {   
     console.log({ ssd: error });
     fs.writeFileSync("status_ssd.txt", error !== null ? "-1" : "1");
  });

  exec("bash run_yolo.sh", (error) => {
    console.log({ yolo: error });
    fs.writeFileSync("status_yolo.txt", error !== null ? "-1" : "1");
  });

  res.status(200).json({ msg: "OK" });
}
