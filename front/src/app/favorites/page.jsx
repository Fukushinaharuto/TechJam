import { Head } from "@/components/Head";
import { ReviewContext } from "@/components/ReviewContext";
export default function Page() {
    const reviews = [
        {
          name: "料理名1",
          userImage: "/icon.svg",
          dishImage: "/test.png",
        },
        {
          name: "料理名2",
          userImage: "/icon.svg",
          dishImage: "/test.png",
        },
        // 必要なだけ要素を追加可能
      ];
    return (
        <div>
            <Head
                title={"お気に入り"}
                iconImage={'/icon-test.svg'}
            />
            <div className="px-4 space-y-6">
                {reviews.map(({ name, userImage, dishImage }, index) => (
                    <ReviewContext
                        key={index}
                        name={name}
                        userImage={userImage}
                        dishImage={dishImage}
                    />
                ))}
            </div>
        </div>
    );
};