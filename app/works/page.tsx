import { getDatabase } from "@/libs/utils/notion";
import styles from "./page.module.scss";
import CustomDialog from "@/libs/components/dialog/dialog";

// const formatDate = (dateString: string) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   const year = date.getFullYear().toString().slice(-2);
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   return `${year}.${month}`;
// };

async function getPosts() {
  try {
    const posts = await getDatabase();
    console.log("Fetched posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Page() {
  const posts = await getPosts();

  const getRelativeTimeOrStatus = (dateString: string) => {
    if (!dateString) return "날짜 없음"; // 날짜가 없으면 "날짜 없음" 표시

    const now = new Date(); // 현재 시간
    const targetDate = new Date(dateString); // 입력된 종료 날짜
    const diff = Math.floor((now.getTime() - targetDate.getTime()) / 1000); // 시간 차이 (초 단위)

    // ✅ 아직 기간이 지나지 않았다면 "진행 중" 표시
    if (diff < 0) return "진행 중";

    // ✅ 이미 기간이 지난 경우 상대적 시간 표시
    if (diff < 60) return `${diff}초 전`; // 1분 미만
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`; // 1시간 미만
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`; // 24시간 미만
    if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`; // 30일 미만
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}달 전`; // 12개월 미만
    return `${Math.floor(diff / 31536000)}년 전`; // 1년 이상
  };

  return (
    <div className={styles.wrap}>
      <CustomDialog
        title="회원 정보 수정"
        description="여기에서 프로필 정보를 수정할 수 있습니다."
        triggerText="프로필 수정"
      >
        <p>여기에 입력 필드 또는 추가적인 UI 컴포넌트를 넣을 수 있습니다.</p>
      </CustomDialog>
      <main className={styles.main}>
        <section>
          <h2>WORKS</h2>
          <div className={styles.list}>
            {posts &&
              posts.map((post: any) => (
                <a
                  href={post.url}
                  target="_blank"
                  key={post.id}
                  className={styles.item}
                >
                  <h3 className={styles.title}>
                    {post.properties.title?.title[0]?.plain_text || ""}
                  </h3>
                  <div className={styles.tags}>
                    {(
                      post.properties.used_technology_stack?.multi_select || []
                    ).map((tag: any) => (
                      <div className={styles.tag} key={tag.id}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  {/* <div>
                    {formatDate(post.properties.due_date?.date?.start || "")}~
                    {formatDate(post.properties.due_date?.date?.end || "")}
                  </div> */}
                  <div className={styles.overview}>
                    {post.properties.overview?.rich_text[0]?.plain_text || ""}
                  </div>
                  <div className={styles.overview}>
                    {post.properties.team_composition?.rich_text[0]
                      ?.plain_text || ""}
                  </div>
                  <div className={styles.date}>
                    {getRelativeTimeOrStatus(
                      post.properties.due_date?.date?.end || ""
                    )}
                  </div>
                </a>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
