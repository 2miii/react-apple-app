import axios from "axios";

const instance = axios.create({
     baseURL: "http://api.themoviedb.org/3",
     params:{
          api_key:"333fc0203c530f8cf4c206bf7fb80d85",
          language:"ko-KR"
     }
})

export default instance;