import OverdueSection from "./overdue-section";
import HandedInSection from "./handed-in-section";

export default async function SectionTasksWrapper() {
  // const courseWorksOverdue = await new FetchGoogle(active).courseWorksOverDue();

  // const returnedReclaimedReturned = await new FetchGoogle(
  //   active,
  // ).fetchReclaimedReturned();

  return (
    <>
      {/* <SectionTasks sectionHeader="Overdue" itemsToShow={courseWorksOverdue} />

      <SectionTasks
        sectionHeader="Returned"
        itemsToShow={returnedReclaimedReturned}
      /> */}
      <OverdueSection />
      <HandedInSection />
    </>
  );
}
