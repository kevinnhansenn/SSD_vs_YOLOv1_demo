import * as fs from "fs";

const statusFile = "status_yolo.txt";

export default async function handler(req, res) {
  const status = await fs.promises.readFile(statusFile, {
    encoding: "utf8",
  });

  if (status === "-1") {
    await fs.promises.writeFile(statusFile, "0");
    return res.status(200).json({ status: "ERROR" });
  }

  fs.readFile("../YOLOv1/test/output.jpg", (err, data) => {
    if (err) {
      res.status(200).json({ status: "PROCESSING" });
    } else {
      res.status(200).json({ status: "OK", data });
    }
  });
}
