import { AlignHorizontally, AlignVertically } from '@icon-park/react';
import { Modal } from 'antd';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../api';
import { GifContext } from '../../context/GifContext';
import { HistoryContext } from '../../context/HistoryContext';
import { UserContext } from '../../context/UserContext';
import SpliceImg from '../../spliceImg';
import styles from './splice.module.scss';

const Splice = (props) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user, setUser } = useContext(UserContext);
  const { historyState, historyDispatch } = useContext(HistoryContext);
  const { gifState, gifDispatch } = useContext(GifContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVertical, setIsVertical] = useState(true);

  function handleVerticalSpliceFrames() {
    // const newVideoFrames = [...gifState.videoFrames];
    // const videoFrame = newVideoFrames[gifState.index];
    setIsModalOpen(true);
    setIsVertical(true);
    // console.log(videoFrame);
  }

  function handleHorizontalSpliceFrames() {
    const newVideoFrames = [...gifState.videoFrames];
    const videoFrame = newVideoFrames[gifState.index];
    setIsModalOpen(true);
    setIsVertical(false);
    console.log(videoFrame);
  }

  function handleSave(blob) {
    let url = URL.createObjectURL(blob);
    let currentVideoFrame = gifState.videoFrames[gifState.index];
    let newVideoFrame = {
      ...currentVideoFrame,
      url: url,
    };
    const newVideoFrames = [...gifState.videoFrames];
    newVideoFrames.splice(gifState.index, 1, newVideoFrame);
    gifDispatch({ type: 'setVideoFrames', videoFrames: newVideoFrames });
  }

  return (
    <div className={`${styles.splice}`}>
      <div className="spliceList">
        <div className="spliceBtn" onClick={handleVerticalSpliceFrames}>
          <AlignVertically className="spliceIcon" theme="outline" size="27" fill="#749EC4" />
          <div className="spliceBtnTitle">垂直拼接</div>
        </div>
        <div className="spliceBtn" onClick={handleHorizontalSpliceFrames}>
          <AlignHorizontally className="spliceIcon" theme="outline" size="27" fill="#749EC4" />
          <div className="spliceBtnTitle">水平拼接</div>
        </div>
      </div>
      <div className="subTitle">拼接</div>
      <Modal
        title="拼接图片"
        style={{ top: 20 }}
        open={isModalOpen}
        // onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <SpliceImg onSave={handleSave} isVertical={isVertical} />
      </Modal>
    </div>
  );
};

export default Splice;
