interface Notice {
  title: string;
  message: string;
}

interface NoticeCardProps {
  notice: Notice;
}

function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <div className="notice-card">
      <h3>{notice.title}</h3>
      <p>{notice.message}</p>
    </div>
  );
}

export default NoticeCard;