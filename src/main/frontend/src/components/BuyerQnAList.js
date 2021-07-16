import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import BuyerQnAService from "../services/BuyerQnAService";

export default function BuyerQnAList({ deal }) {
  const [questionList, setQuestionList] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, []);

  const fetchQuestions = () => {
    BuyerQnAService.getQnAsForWtbListing(deal.wtbId.wtbId).then((res) => {
      setQuestionList(res.data);
    });
  };

  const fetchAnswers = () => {
    const { wtbId, ifsId, seller, dateOfDeal, status } = deal;
    BuyerQnAService.getAnswersByDeal(seller.uid, wtbId.wtbId, ifsId.ifsId).then(
      (res) => {
        setAnswerList(res.data);
      }
    );
  };

  const renderBuyerQnAs = () => {
    return questionList.map((item, index) => {
        return (
          <div>
              <h3>{item.qnaId}. {item.question}</h3>
              <p>{answerList[index].answer}</p>
          </div>
        );
      });
  };

  return <div>{renderBuyerQnAs()}</div>;
}
