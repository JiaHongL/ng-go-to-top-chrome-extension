const fs = require("fs-extra");

const sourceFilePath = "src/content-script.js";
const targetFilePath = "dist/ng-go-to-top-chrome-extension/content-script.js";

const args = process.argv.slice(2);
const environment = args[0];

async function copyContentJS() {

  try {
    // 使用fs-extra的copy方法複製文件
    await fs.copy(sourceFilePath, targetFilePath);

    const enableLiveReload = environment === 'dev' ? true : false;

    // 讀取目標文件的內容
    let data = await fs.readFile(targetFilePath, "utf8");

    // 將 ENABLE_LIVE_RELOAD 替換為指定的值
    data = data.replace(
      "ENABLE_LIVE_RELOAD",
      enableLiveReload
    );

    // 寫入修改後的內容
    await fs.writeFile(targetFilePath, data, "utf8");

  } catch (err) {
    console.error("發生錯誤：", err);
  }
  
}

copyContentJS();
