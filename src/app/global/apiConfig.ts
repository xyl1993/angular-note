export const apiConfig = {
    base_api_host:"api/",         //(../)为相对与dist目录     SuperviseSystem/
    server_ip:'http://47.98.243.170:3001',
    allowUrls : "\/login|\/upload",        //不需要添加token请求的接口
    noAppToken:"\/examinationLogin|\/examination|\/examinationSuccess|\/examinationResult|\/mediaPlayer",     //访问指定页面时不需要token验证
    noJsonTypeUrls:"\/selDomitoryScoreList|\/upload",         //不需要json传参的接口
} 