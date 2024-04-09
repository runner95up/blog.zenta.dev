import { gss, prisma } from "@/lib/server";
import { normalizeZodError } from "@/lib/utils";
import { StackSchema } from "@/schema";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export async function PATCH(req: Request, { params }: Props) {
  try {
    const ses = await gss(true);
    if (!ses.success) {
      return NextResponse.json(ses);
    }

    const body = await req.json();
    const parse = StackSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { id } = params;
    const { name, description, logo } = parse.data;

    const tech = await prisma.tech.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        logo,
        updaterId: ses?.user?.id,
      },
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tech 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tech updated successfully ✅",
        tech,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred 🚫",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  try {
    console.log(params);
    const ses = await gss(true);
    if (!ses.success) {
      return NextResponse.json(ses);
    }

    const { id } = params;

    const tech = await prisma.tech.delete({
      where: {
        id,
      },
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tech 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tech deleted successfully ✅",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred 🚫",
      },
      {
        status: 500,
      }
    );
  }
}
