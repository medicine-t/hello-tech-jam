"use client";

import React, { useState } from "react";
import { Shop } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function fetchShops(
  keyword?: string,
  count: number = 10,
): Promise<Shop[]> {
  const query = new URLSearchParams();
  if (keyword) query.set("keyword", keyword);
  if (Number.isInteger(count)) query.set("count", count.toString());

  try {
    const res = await fetch(`/api/shops?${query.toString()}`);
    if (!res.ok) {
      console.error(`Failed to fetch shops: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return [];
  }
}

const GourmetsClient = ({ initialShops }: { initialShops: Shop[] }) => {
  const [keyword, setKeyword] = useState("");
  const [shops, setShops] = useState<Shop[]>(initialShops);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await fetchShops(keyword, 100);
    setShops(data);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4 mb-8"
      >
        <Input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索..."
          className="max-w-sm w-full"
        />
        <Button type="submit">検索</Button>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <Card key={shop.id}>
              <CardHeader className="space-y-4 p-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={shop.photo.pc.m} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{shop.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{shop.address || "住所情報なし"}</p>
                <p>{shop.genre?.name || "ジャンル情報なし"}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>店舗が見つかりません</p>
        )}
      </div>
      <div>
        Powered by{" "}
        <a href="http://webservice.recruit.co.jp/">
          ホットペッパーグルメ Webサービス
        </a>
      </div>
    </div>
  );
};

export default GourmetsClient;
