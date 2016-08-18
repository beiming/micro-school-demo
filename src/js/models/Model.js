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
}
BaseModel.RESOURCE_HOST = '';

class Course extends BaseModel {
    constructor(json) {
        super();
        this.public = true;
        this.hot = true;
        this.name = '';
        this.grade = '';
        this.subject = '';
        this.cover = '';
        this.background = '';
        this.student_count = 0;
        this.video_count = 0;
        this.desc = '';
        this.reviews = [];
        this.videos = [];
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        if (!this.cover) {
            this.cover = `${BaseModel.RESOURCE_HOST}resource/couse_cover/${this.id}.png`;
        }
        if (!this.background) {
            this.background = `${BaseModel.RESOURCE_HOST}resource/couse_bg/${this.id}.png`;
        }
        this.initVideos();
        this.initReviews();
        this.video_count = this.videos.length;
    }

    initVideos() {
        this.videos = this.videos.map(json => {
            let video = new Video(json);
            video.inCourse = true;
            return video
        });
    }

    initReviews() {
        this.reviews = this.reviews.map(json => new Review(json));
    }

}

class Video extends BaseModel {
    constructor(json) {
        super();
        this.public = true;
        this.hot = true;
        this.name = '';
        this.duration = 0;
        this.view_count = 0;
        this.poster = '';
        this.knowledge_point = '';
        this.grade = '';
        this.subject = '';
        this.initProperties(json);
    }

    set inCourse(value) {
        this.public = this.hot = !value;
    }

    initProperties(json) {
        super.initProperties(json);
        if (!this.poster) {
            this.poster = `resource/video_poster/${this.id}.png`;
        }
        if (!this.url) {
            this.url = `resource/video/${this.id}.mp4`;
        }
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
        if (!this.avatar) {
            this.avatar = `${BaseModel.RESOURCE_HOST}resource/user_avatar/${this.id}.jpg`;
        }
    }
}

class Review extends BaseModel {
    constructor(json) {
        super();
        this.user = null;
        this.created_at = '2017-11-01 12:12'
        this.rating = 0;
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
        this.public = true
        this.initProperties(json);
    }

    initProperties(json) {
        super.initProperties(json);
        if (!this.image) {
            this.image = `${BaseModel.RESOURCE_HOST}resource/banner/${this.id}.png`;
        }
    }
}


export {Course, Video, Banner, User, Review}