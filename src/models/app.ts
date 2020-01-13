export const app = {
    state: {
        navData: [
            {
                name:"Home",
                title:"首页",
                path:"/",
                href:'/',
            },
            {
                name:"SocialRecruitment",
                title:"社会招聘",
                path:"/SocialRecruitment",
                href:'https://job.alibaba.com/zhaopin/positionList.htm',
            },
            {
                name:"CampusRecruitment",
                title:"校园招聘",
                path:"/campusRecruitment",
                href:"https://campus.alibaba.com",
            },
            {
                name:"AboutAli",
                title:"了解阿里",
                path:"/aboutAlit",
                href:"https://job.alibaba.com/zhaopin/about.htm",
            },
            {
                name:"PersonalCenter",
                title:"了解阿里",
                path:"/personalCenter",
                href:"https://job.alibaba.com/zhaopin/apply.htm"
            },
        ],//导航栏model
        // name: '阿里巴巴招聘demo',
        // width: window.innerWidth,
        // isChinese: true,
        // language: '汉语' // 当前语言
    },
    reducers: {

    },
    effects: (dispatch) => ({

    })
}