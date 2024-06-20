import styles from "./Favorite99.module.css";

const Favorite = () => {
  const favoriteItems = Array.from({ length: 100 }, (v, i) => ({
    id: i + 1,
    title: `商品 ${String.fromCharCode(65 + (i % 26))}`,
    description: `這是商品 ${String.fromCharCode(65 + (i % 26))} 的描述`,
    imageUrl: `/src/assets/images/favorites/item${(i % 3) + 1}.jpg`,
  }));

  return (
    <div className={styles.favoritePage}>
      <h1>我的收藏</h1>
      <div className={styles.favoriteGrid}>
        {favoriteItems.map((item) => (
          <div key={item.id} className={styles.favoriteItem}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className={styles.favoriteImage}
            />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
