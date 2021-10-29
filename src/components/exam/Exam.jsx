import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "./Exam.scss";

import Panel from "../common/Walkthrough/Panel/Panel";
import ProgressBar from "../common/Walkthrough/ProgressBar/ProgressBar";
import Viewbox from "../common/Viewbox/Viewbox";
import Overlay from "../common/Modal/Overlay";
import CloseModal from "../common/Modal/common modals/CloseModal";
// import FinishPlayModal from "./modals/FinishPlayModal";
import IntroExamModal from "./modals/IntroExamModal";

import ExamStore from "../../store/exam";
import { useModal } from "../common/Modal/ModalContext";
import {
  MODAL_INTRO_EXAM_ID,
  MODAL_FINISH_EXAM_ID,
} from "../../utils/constants/modals";

const Exam = () => {
  const state = {
    currentStepId: 0,
    isLastStep: false,
  };

  const [, setModalID] = useModal();
  const [examState, setExamState] = useState(state);

  useEffect(() => {
    if (ExamStore.script) {
      setModalID(MODAL_INTRO_EXAM_ID);

      if (ExamStore.script.steps.length === 1) {
        setExamState((prev) => ({ ...prev, isLastStep: true }));
      }
    }
  }, []);

  if (ExamStore.script === undefined) {
    return <Redirect to="/user" />;
  }

  const { currentStepId, isLastStep } = examState;

  const nextStep = () => {
    const stepsNumber = ExamStore.script.steps.length;
    const block = currentStepId === stepsNumber - 2;
    ExamStore.startImageLoad();
    if (block) {
      setExamState((prev) => ({
        currentStepId: prev.currentStepId + 1,
        isLastStep: true,
      }));
    } else {
      setExamState((prev) => ({
        currentStepId: prev.currentStepId + 1,
      }));
    }
  };

  const actionClick = isLastStep
    ? setModalID.bind(null, MODAL_FINISH_EXAM_ID)
    : nextStep;

  const currentStep = ExamStore.script.steps[currentStepId];

  return (
    <main className="exam">
      <Viewbox step={currentStep} actionClick={actionClick} isExam={true} />
      <Panel step={currentStep} isExam={true} />
      <ProgressBar
        current={currentStepId}
        total={ExamStore.script.steps.length}
      />
      <CloseModal isExam={true} />
      <IntroExamModal script={ExamStore.script} />
      {/* <FinishPlayModal /> */}
      <Overlay />
    </main>
  );
};

export default Exam;
