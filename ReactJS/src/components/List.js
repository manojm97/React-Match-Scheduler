import Card from "./Card";


// props:
//   data: consists of data records to be rendered
const i=1;
const List = ({ data }) => (
 
  data ? ( <div className="list">
    {/* Your code goes here */}
    {/* Render the Card with required props here */}
    {/* Object.values(data)[1].map( (match,index) */}
    { data.records.map( (match,i) => 
      <Card 
        _id={match._id}
        index={i+1} 
        count={data.count}
        venue={match.venue} 
        team1={match.team1}
        team2={match.team2} 
        date={match.date}   
      />
    )}
    {/* <Card index={i}/> */}
  </div>) : null
);


export default List;