"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { allCommunityPosts } from "@/data/communityData";
import { likePost, trackView } from "@/lib/api";

function renderContent(markdown: string) {
  return markdown.split("\n").map((line, index, lines) => {
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-2xl font-bold mt-6 mb-4">
          {line.slice(2)}
        </h1>
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-xl font-bold mt-6 mb-3">
          {line.slice(3)}
        </h2>
      );
    }

    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
          {line.slice(4)}
        </h3>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-accent pl-4 my-3 text-gray-600 italic"
        >
          {line.slice(2)}
        </blockquote>
      );
    }

    if (line.startsWith("- ")) {
      const formatted = line
        .slice(2)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /\[(.+?)\]\((.+?)\)/g,
          '<a href="$2" class="text-accent hover:underline">$1</a>'
        );

      return (
        <p
          key={index}
          className="pl-4 my-1.5 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: `• ${formatted}` }}
        />
      );
    }

    if (/^\d+\.\s/.test(line)) {
      return (
        <p key={index} className="pl-4 my-1.5 text-gray-700 leading-relaxed">
          {line}
        </p>
      );
    }

    if (line.startsWith("|")) {
      if (line.includes("---")) return null;
      const nextLine = lines[index + 1] || "";
      const cells = line.split("|").filter((cell) => cell.trim());
      const isHeader = nextLine.includes("---");

      return (
        <div
          key={index}
          className={`grid gap-0 ${isHeader ? "font-semibold bg-gray-50" : ""}`}
          style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
        >
          {cells.map((cell, cellIndex) => (
            <span
              key={`${index}-${cellIndex}`}
              className="px-3 py-1.5 text-sm border border-gray-100"
            >
              {cell.trim()}
            </span>
          ))}
        </div>
      );
    }

    if (line.trim() === "") {
      return <div key={index} className="h-2" />;
    }

    const formatted = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-accent hover:underline">$1</a>'
      );

    return (
      <p
        key={index}
        className="my-1.5 text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

export default function PostDetailClient({
  params,
}: {
  params: { id: string };
}) {
  const postId = params.id;
  const post = allCommunityPosts.find((item) => item.id === postId);
  const [likes, setLikes] = useState(post?.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentNickname, setCommentNickname] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const viewTracked = useRef(false);

  useEffect(() => {
    if (post && !viewTracked.current) {
      viewTracked.current = true;
      trackView(post.id);
    }
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const stored = localStorage.getItem(`liked_${post.id}`);
    if (stored === "1") {
      setLiked(true);
    }
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    return allCommunityPosts
      .filter((item) => item.id !== post.id)
      .sort((a, b) => {
        const aScore =
          (a.category === post.category ? 2 : 0) + (a.city && a.city === post.city ? 1 : 0);
        const bScore =
          (b.category === post.category ? 2 : 0) + (b.city && b.city === post.city ? 1 : 0);

        if (bScore !== aScore) {
          return bScore - aScore;
        }

        return b.date.localeCompare(a.date);
      })
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">帖子不存在</h1>
          <Link href="/community" className="text-accent hover:underline">
            返回保护站信息
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          ← 返回保护站信息
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{post.avatar}</span>
            <div>
              <span className="font-medium">{post.nickname}</span>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
                {post.city ? <span className="text-xs text-gray-400">{post.city}</span> : null}
              </div>
            </div>
          </div>

          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
            <p className="mt-3 text-gray-500 text-base md:text-lg">{post.summary}</p>
          </header>

          {(post.source || post.sourceUrl) && (
            <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-900">信息来源</h2>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                {post.source ? <p>来源：{post.source}</p> : null}
                {post.sourceUrl ? (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline break-all"
                  >
                    查看原始链接
                  </a>
                ) : null}
              </div>
            </section>
          )}

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
            {renderContent(post.content)}
          </div>

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-900">信息说明</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">最近更新</div>
                <div className="mt-1 font-medium text-gray-900">{post.date}</div>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">内容类型</div>
                <div className="mt-1 font-medium text-gray-900">{post.category}</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-yellow-700 leading-relaxed rounded-xl border border-yellow-100 bg-yellow-50 p-4">
              说明：保护站信息中的文章用于帮助你快速理解互联网裁员、再就业和劳动权益相关信息。
              其中带来源链接的内容优先依据公开信息整理；涉及个人情况时，请再结合本地政策和你的材料判断。
            </p>
          </section>

          <div className="mt-6 flex items-center gap-4">
            <motion.button
              onClick={async () => {
                if (liked) return;
                setLiked(true);
                setLikes((prev) => prev + 1);
                setLikeAnimating(true);
                localStorage.setItem(`liked_${post.id}`, "1");
                setTimeout(() => setLikeAnimating(false), 300);
                await likePost(post.id);
              }}
              animate={likeAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors ${
                liked
                  ? "bg-blue-100 text-blue-600 cursor-default"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
              }`}
              disabled={liked}
            >
              👍 {likes} 人觉得有用
            </motion.button>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-bold mb-4">评论 ({post.comments.length})</h2>
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div
                  key={`${comment.nickname}-${comment.date}-${index}`}
                  className="bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{comment.avatar}</span>
                      <span className="text-sm font-medium">{comment.nickname}</span>
                    </div>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100">
              {commentSubmitted ? (
                <div className="text-center py-4">
                  <p className="text-sm text-success font-medium">评论提交成功</p>
                  <p className="text-xs text-amber-600 mt-1">审核通过后会展示在评论区</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={commentNickname}
                    onChange={(event) => setCommentNickname(event.target.value)}
                    placeholder="昵称，可选，默认匿名"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-accent"
                  />
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="写下你的评论..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={async () => {
                      if (!commentText.trim()) return;

                      setCommentSubmitting(true);
                      try {
                        const { submitComment } = await import("@/lib/api");
                        await submitComment({
                          postId,
                          nickname: commentNickname || "匿名打工人",
                          content: commentText,
                        });
                      } catch {}

                      setCommentSubmitting(false);
                      setCommentSubmitted(true);
                    }}
                    disabled={!commentText.trim() || commentSubmitting}
                    className="mt-2 w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {commentSubmitting ? "提交中..." : "发表评论"}
                  </button>
                </>
              )}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold">相关文章</h2>
                <Link href="/community" className="text-sm text-accent hover:underline">
                  查看更多 →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/community/post/${item.id}`}
                    className="block rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug line-clamp-2">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </motion.article>
      </div>
    </div>
  );
}
