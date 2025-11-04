"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string | null;
}

export default function TeamClient() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  // 🔹 Page visibility check
  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("team");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch("/api/team", { cache: "no-store" });
        if (!res.ok) {
          setTeamData([]);
          return;
        }
        const data = await res.json();
        setTeamData(data.teamMembers || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setTeamData([]);
      }
    }

    fetchTeamMembers();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <section className='my-20 min-h-96'>
        <div className='mx-auto text-center'>
          <span className='text-primary'>Great experience in building</span>
          <h2 className='text-4xl font-bold'>Professional Team</h2>
        </div>
        <div className='px-4 my-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {teamData.map((team) => (
            <div key={team.id} className="flex flex-col">
              <div className="flex items-center justify-center">
                {team.photo ? (
                  <Image
                    src={team.photo}
                    alt={`${team.name}-img`}
                    width={272}
                    height={424}
                    className='w-auto h-auto object-contain max-w-[200px]'
                  />
                ) : (
                  <div className="w-[272px] h-[424px] flex items-center justify-center">
                    <User className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </div>
              <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-bl-2xl'>
                <h3 className="font-bold">{team.name}</h3>
                <p className="text-sm">{team.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
