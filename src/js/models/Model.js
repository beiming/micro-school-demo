'use strict';

class BaseModel {
    constructor() {
        this.id = null;
    }

    initProperties(json) {
        for (let key in this) {
            if (json.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    }

    matchDeDefaultResource(property, folder, extName='png') {
        if (!this[property]) {
            this[property] = `${BaseModel.RESOURCE_HOST}resource/${folder}/${this.id}.${extName}?v=${BaseModel.VERSION_NUMBER}`;
        }
    }
}
BaseModel.RESOURCE_HOST = '';
BaseModel.VERSION_NUMBER = '';

class Course extends BaseModel {
    constructor(json) {
        super();
        // 公开
        this.public = false;
        // 校本
        this.org = false;
        // 首页
        this.show_index = false;
        // 热门
        this.hot = false;
        // 倍速课堂
        this.speed_class = false;
        // 超级老师
        this.super_teacher = false;
        this.name = '';
        this.grade = '';
        this.subject = '';
        this.cover = '';
        this.background = '';
        this.student_count = 0;
        this.video_count = 0;
        this.desc = '';
        this.outline = '';
        this.reviews = [];
        this.videos = [];
        this.sumRatings = 0;
        this.showRatings = 0.0;
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        this.matchDeDefaultResource('cover', 'course_cover');
        this.matchDeDefaultResource('background', 'course_bg');
        this.initVideos();
        this.initReviews();
        this.video_count = this.videos.length;
    }

    initVideos() {
        this.videos = this.videos.map(json => {
            let video = new Video(json);
            video.setInCourse();
            return video
        });
    }

    initReviews() {
        this.reviews = this.reviews.map(json => new Review(json));
    }

    calculateCourseRatings() {
        if(this.reviews.length) {
            this.sumRatings = this.reviews.reduce((sunResult, review) => sunResult + review.rating, 0);
            this.showRatings = (this.sumRatings * 2 / this.reviews.length).toFixed(1);
        }
    }

}

class Video extends BaseModel {
    constructor(json) {
        super();
        this.public = true;
        this.show_index = true;
        this.name = '';
        this.duration = 0;
        this.view_count = 0;
        this.poster = '';
        this.knowledge_point = '';
        this.grade = '';
        this.subject = '';
        this.url = '';
        this.initProperties(json);
    }

    setInCourse() {
        this.public = this.show_index = false;
    }

    initProperties(json) {
        super.initProperties(json);
        this.matchDeDefaultResource('poster', 'video_poster');
        this.matchDeDefaultResource('url', 'video', 'mp4');
    }
}

class User extends BaseModel {
    constructor(json) {
        super();
        this.name = '';
        this.avatar = '';
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        this.matchDeDefaultResource('avatar', 'user_avatar');
    }
}

class Review extends BaseModel {
    constructor(json) {
        super();
        this.user = null;
        this.created_at = '';
        this.rating = 0;
        this.content = '';
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        if (this.user) {
            this.user = new User(this.user)
        }
    }
}

class Banner extends BaseModel {
    constructor(json) {
        super();
        this.image = '';
        this.index = 0;
        this.url = '';
        this.public = false;
        this.org = false;
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        this.matchDeDefaultResource('image', 'banner');
    }
}


export {Course, Video, Banner, User, Review, BaseModel}