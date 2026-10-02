
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    // TODAY
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    // THIS WEEK
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();

    const diff =
      day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
      startOfWeek.getDate() - diff
    );

    startOfWeek.setHours(0, 0, 0, 0);

    // THIS MONTH
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // TOTAL UNIQUE VISITORS
    const totalUniqueVisitors =
      await Visitor.countDocuments();

    // TODAY UNIQUE VISITORS
    const todayUniqueVisitors =
      await Visitor.countDocuments({
        lastVisit: {
          $gte: startOfToday,
        },
      });

    // WEEK UNIQUE VISITORS
    const weekUniqueVisitors =
      await Visitor.countDocuments({
        lastVisit: {
          $gte: startOfWeek,
        },
      });

    // MONTH UNIQUE VISITORS
    const monthUniqueVisitors =
      await Visitor.countDocuments({
        lastVisit: {
          $gte: startOfMonth,
        },
      });

    // TOTAL VISITS
    const totalVisitsResult =
      await Visitor.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$visitCount",
            },
          },
        },
      ]);

    const totalVisits =
      totalVisitsResult[0]?.total || 0;

    // TODAY VISITS
    const todayVisitsResult =
      await Visitor.aggregate([
        {
          $match: {
            lastVisit: {
              $gte: startOfToday,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$visitCount",
            },
          },
        },
      ]);

    const todayVisits =
      todayVisitsResult[0]?.total || 0;

    // WEEK VISITS
    const weekVisitsResult =
      await Visitor.aggregate([
        {
          $match: {
            lastVisit: {
              $gte: startOfWeek,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$visitCount",
            },
          },
        },
      ]);

    const weekVisits =
      weekVisitsResult[0]?.total || 0;

    // MONTH VISITS
    const monthVisitsResult =
      await Visitor.aggregate([
        {
          $match: {
            lastVisit: {
              $gte: startOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$visitCount",
            },
          },
        },
      ]);

    const monthVisits =
      monthVisitsResult[0]?.total || 0;

    return NextResponse.json({
      success: true,

      data: {
        visits: {
          today: todayVisits,
          week: weekVisits,
          month: monthVisits,
          total: totalVisits,
        },

        uniqueVisitors: {
          today: todayUniqueVisitors,
          week: weekUniqueVisitors,
          month: monthUniqueVisitors,
          total: totalUniqueVisitors,
        },
      },
    });
  } catch (error) {
    console.error(
      "Analytics stats error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load analytics.",
      },
      {
        status: 500,
      }
    );
  }
}
