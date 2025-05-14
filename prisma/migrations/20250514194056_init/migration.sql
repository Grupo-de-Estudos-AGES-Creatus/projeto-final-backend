-- AlterTable
CREATE SEQUENCE event_id_seq;
ALTER TABLE "Event" ALTER COLUMN "id" SET DEFAULT nextval('event_id_seq');
ALTER SEQUENCE event_id_seq OWNED BY "Event"."id";

-- AlterTable
CREATE SEQUENCE material_id_seq;
ALTER TABLE "Material" ALTER COLUMN "id" SET DEFAULT nextval('material_id_seq');
ALTER SEQUENCE material_id_seq OWNED BY "Material"."id";

-- AlterTable
CREATE SEQUENCE projects_id_seq;
ALTER TABLE "Projects" ALTER COLUMN "id" SET DEFAULT nextval('projects_id_seq');
ALTER SEQUENCE projects_id_seq OWNED BY "Projects"."id";

-- AlterTable
CREATE SEQUENCE sprint_id_seq;
ALTER TABLE "Sprint" ALTER COLUMN "id" SET DEFAULT nextval('sprint_id_seq');
ALTER SEQUENCE sprint_id_seq OWNED BY "Sprint"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
