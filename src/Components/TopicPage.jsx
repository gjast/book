import { useParams } from "react-router-dom";
import "./TopicPage.css";
export default function TopicPage({ topics }) {
  const { id } = useParams();
  const topic = topics[parseInt(id, 10)] || topics[0];

  return (
    <div className="topic-content" style={{ padding: "0 3vw" }}>
      <h1>{topic.title}</h1>
      {topic.content.map((element, index) => (
        <div
          key={index}
          style={{
            fontSize: "1.2rem",
            textAlign: "justify",
            lineHeight: "1.8",
            textIndent: "2em",
            marginBottom: "0.5rem",
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
}
