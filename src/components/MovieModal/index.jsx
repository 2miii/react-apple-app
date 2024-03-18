/* eslint-disable react/prop-types */ 
//특정 ESLint 규칙을 임시로 비활성화하는 주석

import { useRef } from 'react';
import {imageBasePath} from '../../constant'; //상수로 가져오기
import './MovieModal.css';

//MovieModal {...movieSelected} 를 가져올 땐 {movieSelected}이 아니라 아래와 같이 가져올 수 있음
export const MovieModal = ({
  backdrop_path,
  title, 
  overview, 
  name,
  release_date, 
  fisrt_air_date, 
  vote_average,
  setModalOpen
}) => {

const ref = useRef(null);
console.log(ref);

useOneClickOutsitde(ref, () => {
  setModalOpen(false);
})
  



  return (
    <div className="presentation" role="presentation">
      <div className="wrap_modal">
        <div className="modal" ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className="modal_close"
          >
            X
          </span>
          <img
            className="modal_poster-img"
            src={`${imageBasePath}${backdrop_path}`}
            alt="modal_poster-img"
          />
          <div className="modal_content">
            <p className="modal_details">
              <span>
                100% for you
              </span> {""}
              {release_date ? release_date : fisrt_air_date}
            </p>
            <h2 className="modal_title">
              {title ? title : name}
            </h2>
            <p className="modal_overview">
              평점 : {vote_average}
            </p>
            <p className="modal_overview">
              {overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;