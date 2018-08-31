export const apiConfig = {
    base_api_host:"api/",         //(../)为相对与dist目录     SuperviseSystem/
    // base_api_host:"api/",         //(../)为相对与dist目录     SuperviseSystem/
    allowUrls : "login",        //不需要添加token请求的接口
    noAppToken:"\/examinationLogin|\/examination|\/examinationSuccess|\/examinationResult|\/mediaPlayer",     //访问指定页面时不需要token验证
    noJsonTypeUrls:"\/selDomitoryScoreList|\/getSealRecord|\/getDisciplinary|\/getShopBiddingList|\/getCostRemarkList"+
                    "|\/getDisciplinaryReport|\/getEventList|\/getApplyCarDetail|analysis|selectSignList"+
                    "|\/selMeetingReport",         //不需要json传参的接口
} 