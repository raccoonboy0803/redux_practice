import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export interface StateProps {
  date: string;
  item: string;
  amount: number;
  description: string;
  id: string;
}

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { id, date, item, description, amount }: StateProps = state || {};
  const [stateVal, setStateVal] = useState<StateProps>({
    item,
    date,
    description,
    amount,
    id,
  });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setStateVal((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const updateState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const prevData = localStorage.getItem('data');
    if (prevData) {
      const parsedData = JSON.parse(prevData);
      const newData = parsedData.map((data: StateProps) => {
        if (data.id === stateVal.id) {
          return stateVal;
        } else {
          return data;
        }
      });
      localStorage.setItem('data', JSON.stringify(newData));
      navigate('/', { state: { newData: stateVal } });
    }
  };

  const deleteState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = window.confirm('정말로 이 지출 항목을 삭제하시겠습니까?');
    if (!response) {
      return;
    }
    const prevData = localStorage.getItem('data');
    if (prevData) {
      const parsedData = JSON.parse(prevData);
      const filteredData = parsedData.filter(
        (data: StateProps) => data.id !== stateVal.id
      );
      localStorage.setItem('data', JSON.stringify(filteredData));
      navigate('/', { state: { delData: stateVal } });
    }
  };

  const moveToPrev = () => {
    navigate('/');
  };

  return (
    <DetailWrap>
      <Form>
        <Label htmlFor="data">날짜</Label>
        <Input id="date" value={stateVal.date} onChange={changeInput} />
        <Label htmlFor="item">항목</Label>
        <Input id="item" value={stateVal.item} onChange={changeInput} />
        <Label htmlFor="amount">금액</Label>
        <Input
          id="amount"
          type="number"
          value={stateVal.amount}
          onChange={changeInput}
        />
        <Label htmlFor="description">내용</Label>
        <Input
          id="description"
          value={stateVal.description}
          onChange={changeInput}
        />
        <BtnWrap>
          <UpdateBtn onClick={updateState}>수정</UpdateBtn>
          <DelBtn onClick={deleteState}>삭제</DelBtn>
          <PrevBtn onClick={moveToPrev}>뒤로 가기</PrevBtn>
        </BtnWrap>
      </Form>
    </DetailWrap>
  );
}

export default Detail;

const DetailWrap = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const BtnWrap = styled.div``;

const UpdateBtn = styled.button``;

const DelBtn = styled.button``;

const PrevBtn = styled.button``;
