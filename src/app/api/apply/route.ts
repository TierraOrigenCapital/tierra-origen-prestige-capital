import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getWixClient } from "@/lib/wix";

/**
 * POST /api/apply
 * Saves investor application to Wix CMS collection.
 *
 * Auto-detects collection by name (InvestorApplications, Members, Applications) when
 * WIX_MEMBERS_COLLECTION_ID is not set. Create a CMS collection in Wix Studio with
 * fields: fullName, email, phone, countryOfOrigin, passwordHash, residencyStatus,
 * investmentType, budgetRange, depositReady, shareRange, riskProfile, status.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      countryOfOrigin,
      password,
      residency,
      investmentType,
      budgetRange,
      depositReady,
      shareRange,
      riskProfile,
    } = body;

    if (!fullName || !email || !password || password.length < 8) {
      return NextResponse.json(
        { message: "Full name, email, and password (min 8 chars) are required." },
        { status: 400 },
      );
    }

    const passwordHash = await hash(password, 10);

    const memberData = {
      fullName: String(fullName),
      email: String(email).toLowerCase(),
      phone: String(phone || ""),
      countryOfOrigin: String(countryOfOrigin || "Colombia"),
      passwordHash,
      residencyStatus: String(residency || ""),
      investmentType: String(investmentType || ""),
      budgetRange: String(budgetRange || ""),
      depositReady: String(depositReady || ""),
      shareRange: Number(shareRange) || 0,
      riskProfile: String(riskProfile || ""),
      status: "pending",
    };

    const wix = getWixClient();
    if (wix) {
      let collectionId = process.env.WIX_MEMBERS_COLLECTION_ID;
      if (!collectionId && wix.collections) {
        try {
          const { collections } = await (wix.collections as any).listDataCollections({});
          const list = collections || [];
          const match =
            list.find((c: any) => {
              const name = (c.displayName || c._id || "").toLowerCase();
              return name.includes("investor") || name.includes("member") || name.includes("application");
            }) ||
            list.find((c: any) => c.collectionType === "USER_DEFINED" || c.collectionType === "NATIVE") ||
            list[0];
          if (match?._id) collectionId = match._id;
        } catch (e) {
          console.warn("[apply] Could not auto-detect collection:", e);
        }
      }
      if (collectionId) {
        try {
          await wix.items.insertDataItem({
            dataCollectionId: collectionId,
            dataItem: {
              data: memberData,
            },
          });
        } catch (wixErr) {
          console.error("[apply] Wix insert failed:", wixErr);
          return NextResponse.json(
            { message: "Could not save application. Please try again." },
            { status: 500 },
          );
        }
      } else {
        console.warn("[apply] No collection found. Add WIX_MEMBERS_COLLECTION_ID or create a CMS collection named InvestorApplications/Members.");
      }
    } else {
      console.warn("[apply] Wix client unavailable.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[apply] Error:", err);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
}
