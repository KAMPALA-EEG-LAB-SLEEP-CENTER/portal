import headacheHeroImage from "../assets//Head.jpg";
import anxietyImage from "../assets//Anxiety.jpg";
import DepressionImage from "../assets//Depression.jpg";
import epilepsyandseizureImage from "../assets//epilepsy and seizure.jpg";

// portal/src/assets/headaches.jpg
// blog - headache - hero.jpg;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  content: { heading?: string; paragraphs: string[]; list?: string[]; image?: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-headaches-causes-testing-management",
    title: "Understanding Headaches: Causes, Testing, and Management",
    excerpt:
      "Headaches are one of the most common complaints we see, but the cause behind them can vary widely. Here's a breakdown of what could be causing your headache, how it can be tested for, and how it can be managed.",
    date: "August 4, 2026",
    image: headacheHeroImage,
    content: [
      {
        paragraphs: [
          "A headache is pain or discomfort felt in the head. While almost everyone experiences a headache at some point, the underlying cause can range from something minor and temporary to a sign of an underlying condition that needs attention.",
        ],
      },
      {
        heading: "What Causes Headaches?",
        paragraphs: [
          "Headache causes are generally grouped into three categories:",
        ],
      },
      {
        heading: "1. Organic Causes",
        paragraphs: [
          "These occur when there is an underlying disease process in the body. This includes acute infections such as malaria, meningitis, and other bacterial infections, as well as non-acute or structural causes such as intracranial hypotension (leakage of cerebrospinal fluid) or intracranial hypertension (overproduction of cerebrospinal fluid).",
        ],
      },
      {
        heading: "2. Inorganic Causes",
        paragraphs: [
          "These headaches occur without any underlying physical or structural problem. Mood disorders such as anxiety and tension-type headaches often fall into this category.",
        ],
      },
      {
        heading: "3. Idiopathic Headaches",
        paragraphs: [
          "These are headaches with no clearly identified cause. Migraine headaches and cluster headaches are common examples.",
        ],
      },
      {
        heading: "A Closer Look at the Causes",
        paragraphs: ["Breaking this down further:"],
        list: [
          "Organic causes: Acute infections (meningitis, vasculitis, malaria) and metabolic disorders (e.g. hyperthyroidism)",
          "Inorganic causes: Structural issues like brain tumors or bleeding in the brain, intracranial hypotension, idiopathic intracranial hypertension, primary anxiety and mood disorders, and autoimmune disorders where the body's immune system affects brain cells",
          "Idiopathic causes: Primary headache disorders such as migraine and cluster headaches, where no single known cause has been identified — though several hypotheses remain under discussion",
        ],
      },
      {
        heading: "What Tests Can Help Identify the Cause?",
        paragraphs: [
          "If you are experiencing persistent or concerning headaches, several tests can help determine what might be causing them, including a brain CT scan, an EEG, an MRI, and blood tests.",
        ],
      },
      {
        heading: "How Are Headaches Managed?",
        paragraphs: [
          "Management is directed at the underlying cause. For organic causes, treatment focuses on eradicating the underlying infection or condition. In some cases — such as headaches caused by a tumor — surgery may be necessary. Other approaches include drug therapy, and for headaches linked to mood disorders, cognitive behavioral therapy can be an effective form of mood therapy.",
        ],
      },
      {
        heading: "In Conclusion",
        paragraphs: [
          "Headaches can be caused by a variety of factors, and the good news is that all of them can be managed appropriately with the right diagnosis.",
          "Left untreated, headaches can affect your lifestyle, health, and day-to-day productivity. If you are experiencing recurring or concerning headaches, it is worth finding out what is causing them and getting proper management.",
        ],
      },
    ],
  },
  {
    slug: "anxiety-disorder-symptoms-causes-prevention",
    title: "Anxiety Disorder: Symptoms, Risk Factors, and Prevention",
    excerpt:
      "Occasional anxiety is a normal part of life, but for some people worry and fear become intense, persistent, and hard to control. Here is what to know about anxiety disorders, their symptoms, and when to see a doctor.",
    date: "August 4, 2026",
    image: anxietyImage,
    content: [
      {
        paragraphs: [
          "Experiencing occasional anxiety is a normal part of life. However, people with anxiety disorders frequently have intense, excessive, and persistent worry and fear about everyday situations. Often, anxiety disorders involve repeated episodes of sudden, intense anxiety, fear, or terror that reach a peak within minutes — known as panic attacks.",
          "These feelings of anxiety and panic interfere with daily activities, are difficult to control, are out of proportion to the actual danger, and can last a long time. Some people avoid places or situations to prevent these feelings. Symptoms may start during childhood or the teen years and continue into adulthood.",
          "Examples of anxiety disorders include generalized anxiety disorder, social anxiety disorder (social phobia), specific phobias, and separation anxiety disorder. It is possible to have more than one anxiety disorder, and sometimes anxiety results from a medical condition that needs treatment.",
        ],
      },
      {
        heading: "Common Symptoms",
        paragraphs: ["Common anxiety signs and symptoms include:"],
        list: [
          "Feeling nervous, restless, or tense",
          "Shortness of breath and rapid breathing (hyperventilation)",
          "Increased heart rate",
          "Sweating and trembling",
          "Feeling weak or tired",
          "Trouble concentrating or thinking about anything other than the present worry",
          "Trouble sleeping (insomnia)",
          "Gastrointestinal problems such as ulcers, nausea, and abdominal discomfort",
          "Difficulty controlling worry, which can lead to depression",
          "Negative self-talk",
        ],
      },
      {
        heading: "Types of Anxiety Disorders",
        paragraphs: [],
        list: [
          "Agoraphobia: fear and avoidance of places or situations that might cause panic or a feeling of being trapped, helpless, or embarrassed — for example, giving a public speech",
          "Anxiety disorder due to a medical condition: intense anxiety or panic directly caused by a physical health problem, such as a serious diagnosis",
          "Generalized anxiety disorder: persistent, excessive worry about everyday issues that is out of proportion to the actual circumstance and difficult to control",
          "Panic disorder: repeated episodes of sudden, intense fear with symptoms like shortness of breath, chest pain, or heart palpitations, sometimes leading to fear of future attacks",
          "Selective mutism: a consistent failure to speak in certain situations (such as school), despite being able to speak elsewhere",
          "Obsessive-compulsive disorder (OCD): recurring intrusive thoughts that drive repeated behaviors",
          "Post-traumatic stress disorder (PTSD): develops after distressing events such as a fatal accident, loss of a loved one, abuse, or natural disaster, marked by flashbacks, nightmares, and avoidance of triggers",
          "Substance-induced anxiety disorder: anxiety caused by substance use or withdrawal, such as caffeine, nicotine, or benzodiazepines",
        ],
      },
      {
        heading: "When to See a Doctor",
        paragraphs: [],
        list: [
          "Your worry is interfering with work, relationships, or other parts of your life",
          "Your fear, worry, or anxiety is upsetting and difficult to control",
          "You feel depressed, struggle with alcohol or drug use, or have other mental health concerns alongside anxiety",
          "You think your anxiety could be linked to a physical health problem",
          "You have suicidal thoughts or behaviors — if this is the case, seek emergency treatment immediately",
        ],
      },
      {
        heading: "Risk Factors",
        paragraphs: [
          "These factors may increase your risk of developing an anxiety disorder:",
        ],
        list: [
          "Trauma: childhood abuse, trauma, or witnessing traumatic events increases risk, as does experiencing a traumatic event as an adult",
          "Stress due to illness: a serious health condition can cause significant worry about treatment and the future",
          "Stress buildup: a major event or accumulation of smaller stressors — such as a death in the family, work stress, or financial worry",
          "Personality: traits like perfectionism and low self-esteem are associated with higher risk",
          "Other mental health disorders: anxiety often co-occurs with depression",
          "Family history: anxiety disorders can run in families",
          "Drugs or alcohol: use, misuse, or withdrawal can cause or worsen anxiety",
          "Brain chemistry: imbalances in neurotransmitters such as serotonin and dopamine",
          "Hormonal imbalance: changes during pregnancy, menopause, or menstruation can contribute to anxiety",
        ],
      },
      {
        heading: "Complications",
        paragraphs: [
          "Anxiety disorders can lead to or worsen other conditions, including:",
        ],
        list: [
          "Depression or other mental health disorders",
          "Insomnia",
          "Digestive or bowel problems",
          "Headaches and chronic pain",
          "Social isolation",
          "Problems functioning at school or work",
          "Poor quality of life",
          "Suicide",
        ],
      },
      {
        heading: "Prevention",
        paragraphs: [
          "There is no way to predict for certain what will cause someone to develop an anxiety disorder, but these steps can help reduce the impact of symptoms:",
        ],
        list: [
          "Get help early — anxiety can be harder to treat the longer it goes unaddressed",
          "Stay active and engaged in activities and relationships that feel good",
          "Avoid alcohol and drug use, which can cause or worsen anxiety",
          "Regular physical exercise helps regulate stress and prevent it from building up",
        ],
      },
    ],
  },
  {
    slug: "depression-major-depressive-disorder",
    title: "Depression (Major Depressive Disorder): What You Should Know",
    excerpt:
      "Depression is more than a passing bout of sadness. Here is what causes it, how it presents differently across age groups, and what can be done to manage and prevent it.",
    date: "August 4, 2026",
    image: DepressionImage,
    content: [
      {
        paragraphs: [
          "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think, and behave, and can lead to a variety of emotional and physical problems. You may have trouble with normal day-to-day activities, and sometimes feel as if life is not worth living.",
          'More than just a bout of the blues, depression is not a weakness, and you cannot simply "snap out" of it. It may require long-term treatment, but most people with depression feel better with medication, psychotherapy, or both.',
        ],
      },
      {
        heading: "Symptoms",
        paragraphs: [
          "Although depression may occur only once during a person's life, people typically have multiple episodes. During these episodes, symptoms occur most of the day, nearly every day, and may include:",
        ],
        list: [
          "Feelings of sadness, tearfulness, emptiness, or hopelessness",
          "Angry outbursts, irritability, or frustration, even over small matters",
          "Loss of interest or pleasure in most or all normal activities",
          "Sleep disturbances, including insomnia or sleeping too much",
          "Tiredness and lack of energy, so even small tasks take extra effort",
          "Reduced appetite and weight loss, or increased cravings and weight gain",
          "Anxiety, agitation, or restlessness",
          "Slowed thinking, speaking, or body movements",
          "Feelings of worthlessness or guilt, fixating on past failures",
          "Trouble thinking, concentrating, making decisions, or remembering things",
          "Frequent or recurrent thoughts of death or suicide",
          "Unexplained physical problems, such as back pain or headaches",
        ],
      },
      {
        heading: "Symptoms in Children and Teens",
        paragraphs: [
          "In younger children, symptoms may include sadness, irritability, clinginess, worry, aches and pains, refusing to go to school, or being underweight.",
          "In teens, symptoms may include sadness, irritability, feeling negative and worthless, anger, poor performance or attendance at school, feeling misunderstood, using recreational drugs or alcohol, eating or sleeping too much, self-harm, and avoidance of social interaction.",
        ],
      },
      {
        heading: "Symptoms in Older Adults",
        paragraphs: [
          "Depression is not a normal part of growing older, and it should never be taken lightly. It often goes undiagnosed and untreated in older adults, who may feel reluctant to seek help. Symptoms may be different or less obvious, including:",
        ],
        list: [
          "Memory difficulties or personality changes",
          "Physical aches or pain",
          "Fatigue, loss of appetite, sleep problems, or loss of interest in sex — not caused by a medical condition or medication",
          "Wanting to stay home rather than socializing or trying new things",
          "Suicidal thinking or feelings, especially in older men",
        ],
      },
      {
        heading: "Causes",
        paragraphs: [
          "It is not known exactly what causes depression. As with many mental disorders, a variety of factors may be involved:",
        ],
        list: [
          "Biological differences: people with depression appear to have physical changes in their brains",
          "Brain chemistry: neurotransmitters likely play a role, along with how they interact with neurocircuits involved in mood stability",
          "Hormones: changes in hormone balance can trigger depression, including during pregnancy, postpartum, or due to thyroid problems and menopause",
          "Inherited traits: depression is more common in people whose blood relatives also have the condition",
        ],
      },
      {
        heading: "Risk Factors",
        paragraphs: [
          "Depression often begins in the teens, 20s, or 30s, but can happen at any age. Factors that may increase risk include:",
        ],
        list: [
          "Certain personality traits, such as low self-esteem, being too dependent, self-critical, or pessimistic",
          "Traumatic or stressful events, such as abuse, loss of a loved one, or financial problems",
          "Blood relatives with a history of depression, bipolar disorder, alcoholism, or suicide",
          "History of other mental health disorders, such as anxiety or eating disorders",
          "Abuse of alcohol or recreational drugs",
          "Serious or chronic illness, including cancer, stroke, or heart disease",
          "Certain medications",
        ],
      },
      {
        heading: "Complications",
        paragraphs: [
          "Depression often gets worse if untreated, resulting in emotional, behavioral, and health problems that affect every area of life, including:",
        ],
        list: [
          "Excess weight or obesity, which can lead to heart disease and diabetes",
          "Pain or physical illness",
          "Alcohol or drug misuse",
          "Anxiety, panic disorder, or social phobia",
          "Family conflicts, relationship difficulties, and work or school problems",
          "Social isolation",
          "Suicidal feelings, suicide attempts, or suicide",
        ],
      },
      {
        heading: "Prevention",
        paragraphs: [
          "There is no sure way to prevent depression, but these strategies may help:",
        ],
        list: [
          "Take steps to control stress, build resilience, and boost self-esteem",
          "Reach out to family and friends, especially during times of crisis",
          "Get treatment at the earliest sign of a problem",
          "Consider long-term maintenance treatment to help prevent relapse",
        ],
      },
    ],
  },
  {
    slug: "epilepsy-and-seizure-disorders-guide",
    title: "Epilepsy and Seizure Disorders: A Guide to the Different Syndromes",
    excerpt:
      'Epilepsy is one of the most common neurological disorders worldwide, affecting an estimated 50 million people. But "epilepsy" is not one condition — it covers many distinct syndromes, each with its own pattern, prognosis, and treatment approach.',
    date: "August 4, 2026",
    image: epilepsyandseizureImage,
    content: [
      {
        paragraphs: [
          "Epilepsy is a neurological disorder characterized by recurrent seizures — sudden surges of electrical activity in the brain. According to the World Health Organization, approximately 50 million people worldwide live with epilepsy, making it one of the most common neurological disorders.",
          "These epilepsies are categorized depending on EEG pattern, prognosis, and the signs and symptoms each presents. Many share overlapping features, but each has a unique presentation when observed closely. Below is a guide to some of the recognized epilepsy syndromes.",
        ],
      },
      {
        heading: "Malignant Migrating Partial Seizures (Coppola Syndrome)",
        paragraphs: [
          "This seizure type occurs between the first week of life and 7 months, typically with no traceable family history. It has a motor onset and becomes polymorphous, with possible secondary generalization, and there is a marked progressive increase in seizure frequency and duration. Seizures are often drug-resistant with a poor prognosis, profound developmental and neurological deterioration, and possible death within a year.",
        ],
        list: [
          "Signs: seizures, developmental delay, microcephaly, hypotonia, athetotic movements",
          "Seizure types include epileptic spasms, focal seizures, tonic-clonic seizures, myoclonic seizures, and behavioral abnormalities such as autistic-like behavior, hyperactivity, and aggression",
        ],
      },
      {
        heading: "Benign Infantile Convulsions",
        paragraphs: [
          "A generally harmless epilepsy syndrome in infants that typically resolves on its own without long-term developmental issues. Onset is usually between 4–8 months, with brief seizures lasting only a few minutes, more common on waking. Infants with this syndrome typically outgrow their seizures by 2–3 years of age, with anticonvulsant medication and regular EEG monitoring used in the meantime.",
        ],
      },
      {
        heading: "BECTS (Benign Epilepsy with Central-Temporal Spikes)",
        paragraphs: [
          "Typically affects children with onset between 4–8 years and is outgrown by adolescence. Seizures are brief (under two minutes), often occurring during sleep or waking, and may present as focal seizures, generalized seizures, or absence seizures. Anticonvulsant medication and routine EEG monitoring are the standard approach; seizures are often triggered by sleep deprivation, fatigue, or stress.",
        ],
      },
      {
        heading: "Occipital Lobe Epilepsy of Childhood (Gastaut Type)",
        paragraphs: [
          "A rare form affecting children typically aged 3–8 years. Seizures are usually diurnal, brief, and frequent, characterized by visual symptoms that may be followed by sensory symptoms, eye movements, tonic eye deviation, loss of consciousness, and secondary generalization. Post-ictal headache proportional to seizure intensity can make it difficult to distinguish from migraine. Prognosis is generally good with treatment, though it can be difficult to control.",
        ],
      },
      {
        heading: "Frontal Lobe Epilepsy (FLE)",
        paragraphs: [
          "Originates from the frontal lobe, with seizures often occurring during sleep or upon waking. Seizures are brief (20–40 seconds) and may involve motor symptoms like tonic posturing or clonic movements, loss of coordination, or involuntary movements.",
        ],
        list: [
          "Simple partial seizures: motor, sensory, or autonomic symptoms such as picking at clothes, lip smacking, or chewing movements",
          "Complex partial seizures: impaired vision, impaired consciousness, disorientation, and confusion",
          "Generalized seizures: loss of consciousness, convulsions, and muscle stiffness",
        ],
      },
      {
        heading: "Central Lobe Epilepsy",
        paragraphs: [
          "Seizures originate from the central lobe, typically with preserved consciousness. Manifestations include focal clonic movements starting in the mouth, tongue, or face and spreading to the opposite limb, somatosensory auras, drooling, and speech difficulty. EEG helps identify epileptiform activity in the central region. Anticonvulsants are the primary treatment, with surgery (such as anterior temporal lobectomy) considered for refractory cases.",
        ],
      },
      {
        heading: "Parietal Lobe Epilepsy",
        paragraphs: [
          "An uncommon focal epilepsy where seizures originate in the parietal lobe, often causing sensory disturbances such as numbness, tingling, or sensations of heat, cold, or electric shock. Other symptoms can include vertigo, distorted body perception, hallucinations, aphasia, and pain. EEG is used for diagnosis, though it may not always be conclusive; treatment includes antiepileptic medication, with surgery an option in some cases.",
        ],
      },
      {
        heading: "Insula Epilepsy",
        paragraphs: [
          "Originates in the insula, a deep brain structure, and can be difficult to diagnose because seizures may mimic those from other brain regions. Seizures often begin with nonspecific symptoms such as unusual sensations, numbness, tingling, or autonomic symptoms like abdominal pain, nausea, vomiting, or palpitations. Diagnosis can be challenging due to the deep location of the insular cortex; anticonvulsant medication is the standard treatment.",
        ],
      },
      {
        heading: "BMEI (Benign Myoclonic Epilepsy in Infancy)",
        paragraphs: [
          "Characterized by brief myoclonic attacks in otherwise normal infants aged 4 months to 3 years, mainly involving the head and upper limbs and lasting only seconds. A family history of epilepsy or febrile convulsions is present in about 30% of cases. BMEI is considered benign, usually resolving between 6 months and 5 years after onset, and typically responds well to treatment with normal cognitive and developmental outcomes. Some children show photosensitivity.",
        ],
      },
      {
        heading: "Doose Syndrome (Myoclonic-Astatic Epilepsy)",
        paragraphs: [
          "A rare childhood syndrome featuring frequent myoclonic and myoclonic-atonic seizures, typically starting between 1–5 years of age (peak onset 2–4 years). Generalized tonic-clonic, absence, and tonic seizures can also occur. Development is usually normal before onset, though stagnation or regression can occur during the active seizure phase. Diagnosis relies on clinical features and EEG findings; the ketogenic diet and newer anticonvulsants like levetiracetam and zonisamide are often used alongside standard medications. Prognosis varies — some children achieve seizure freedom, while others continue to have seizures despite treatment.",
        ],
      },
      {
        heading: "Childhood Absence Epilepsy (CAE)",
        paragraphs: [
          "A common syndrome characterized by brief impaired-awareness episodes appearing as staring spells, which can occur many times a day. Onset is usually between 3–10 years (peak 5–7 years). Episodes last only seconds, may include rapid blinking, slight hand movements, or lip smacking, and occur without warning. Generalized tonic-clonic seizures can also occur. Diagnosis involves medical history and EEG; absence seizures can usually be managed effectively with medication, and many children outgrow them by adolescence, though some continue to have them into adulthood.",
        ],
      },
      {
        heading: "Generalized Epilepsy with Febrile Seizures Plus (GEFS+)",
        paragraphs: [
          "A genetic, familial epilepsy syndrome where affected individuals experience febrile seizures plus other seizure types (afebrile seizures) that can persist beyond early childhood — including tonic-clonic, myoclonic, atonic, or absence seizures. Onset is typically in infancy or early childhood, and seizures often remit by late childhood or early adolescence. Diagnosis involves clinical features, family history, genetic testing, and EEG. Treatment focuses on anti-seizure medication, with vagus nerve stimulation considered in some cases. Prognosis is generally good, though some individuals experience more persistent or severe seizures.",
        ],
      },
      {
        heading: "Jeavons Syndrome (Epilepsy with Eyelid Myoclonia)",
        paragraphs: [
          "Characterized by frequent, often rhythmic jerking or flickering of the eyelids, typically triggered by eye closure or bright/flickering lights, and can be associated with absence seizures. Onset is typically between ages 6–8 (range 1–15). Seizures can be difficult to control, and many individuals develop drug-resistant epilepsy. Generalized tonic-clonic seizures may also occur. A genetic component is suspected. EEG helps confirm diagnosis; treatment includes antiseizure medication and, in some cases, the ketogenic diet.",
        ],
      },
      {
        heading: "Juvenile Myoclonic Epilepsy (JME)",
        paragraphs: [
          "The most common generalized epilepsy syndrome, usually first seen in adolescence. Myoclonic seizures — shock-like, irregular jerks of both arms, typically within 1–2 hours of waking — occur in everyone with JME and are often triggered by lack of sleep and flashing lights. Generalized tonic-clonic seizures occur in nearly all people with JME, usually beginning a few months after myoclonic jerks start. Absence seizures occur in less than half of cases and are often brief (under 10 seconds).",
          "Lack of sleep and stress are the two most common seizure triggers, along with alcohol and photosensitive triggers such as strobe lights or flickering screens. Treatment starts with education on lifestyle and trigger avoidance, particularly avoiding sleep deprivation and alcohol. Seizures are generally well controlled with medication in up to 90% of people, though lifelong treatment is usually necessary, and seizures tend to improve after the fourth decade of life.",
        ],
      },
      {
        heading: "Juvenile Absence Epilepsy (JAE)",
        paragraphs: [
          "Typically starts in adolescence around puberty (ages 10–17), characterized by absence seizures and, in some cases, generalized tonic-clonic seizures or myoclonic jerks. Absence seizures appear as brief staring spells that may include eyelid fluttering and can resemble daydreaming. Diagnosis relies on EEG, and people with JAE typically require lifelong treatment with anti-seizure medication.",
        ],
      },
      {
        heading: "Syndrome of Myoclonic Absences (EMA)",
        paragraphs: [
          "A rare childhood-onset syndrome featuring myoclonic absence seizures — rhythmic jerks of the upper limbs combined with tonic arm elevation and a brief loss of awareness — lasting 10–60 seconds and occurring multiple times a day. Onset is typically between 1–12 years (peak around 7). Autonomic features like urinary incontinence and apnea are commonly associated. Treatment typically combines valproate and ethosuximide; seizures are often treatment-resistant, with remission occurring in about 40% of cases, and better prognosis when myoclonic absence is the only seizure type present.",
        ],
      },
      {
        heading: "Awakening Epilepsy",
        paragraphs: [
          "Seizures — typically generalized tonic-clonic — occur predominantly upon awakening or within a few hours of waking, though they can also occur during evening relaxation. Absence or myoclonic seizures may also occur. The exact cause is unclear but is thought to involve genetic predisposition and can be triggered by sleep deprivation. Diagnosis involves medical history, neurological exam, and EEG; the condition is often managed effectively with medication and regular sleep patterns.",
        ],
      },
      {
        heading: "Ohtahara Syndrome",
        paragraphs: [
          "A rare and severe form of epilepsy manifesting in the first three months of life (often within the first 10 days), characterized primarily by tonic seizures, along with focal and myoclonic seizures. Severe developmental delays, movement disorders, vision problems, and feeding difficulties are common. Prognosis is poor, with high mortality and morbidity; the condition can evolve into West syndrome and later Lennox-Gastaut syndrome. Treatment focuses on seizure management, as there is no cure.",
        ],
      },
      {
        heading: "West Syndrome (Infantile Epileptic Spasms Syndrome)",
        paragraphs: [
          'Begins in infancy, typically between 4–8 months, characterized by infantile spasms (sudden jerking movements often described as "jackknife" or "salaam" movements), developmental delay or regression, and a distinctive disorganized EEG pattern called hypsarrhythmia. Causes can be structural, metabolic, genetic, or infectious, though sometimes unknown. Treatment may include ACTH, vigabatrin, or corticosteroids.',
        ],
      },
      {
        heading: "Aicardi Syndrome",
        paragraphs: [
          "A rare, almost exclusively female, genetic neurodevelopmental disorder characterized by a triad of agenesis of the corpus callosum, infantile spasms, and chorioretinal lacunae (retinal defects), often leading to developmental delays and intellectual disabilities. Other features can include additional brain malformations, optic nerve abnormalities, scoliosis, microcephaly, and other eye abnormalities. Believed to be caused by a gene defect on the X chromosome. There is no cure; treatment focuses on managing seizures and developmental challenges through medication, physiotherapy, and other supportive therapies.",
        ],
      },
      {
        heading: "Dravet Syndrome",
        paragraphs: [
          "A rare, genetic epilepsy disorder typically manifesting in the first year of life with seizures often triggered by fever or illness. Multiple seizure types occur, including tonic-clonic, myoclonic, and atypical absence seizures, and these are often difficult to control with conventional medication. Children initially develop normally but experience developmental delays and regression over time, including in language and motor skills. Most cases are caused by a mutation in the SCN1A gene. Dravet syndrome is a lifelong condition requiring a multidisciplinary management approach involving neurologists, epileptologists, developmental pediatricians, and therapists.",
        ],
      },
      {
        heading: "Lennox-Gastaut Syndrome (LGS)",
        paragraphs: [
          "A severe childhood epilepsy syndrome, often beginning before age 4, characterized by multiple seizure types (tonic, atonic, atypical absence, and myoclonic), intellectual disability or regression, and a characteristic slow spike-and-wave EEG pattern. Causes can include genetic disorders, brain malformations, tumors, infections, and head injuries. LGS is often difficult to manage; treatment options include medications, the ketogenic diet, surgery (such as corpus callosotomy), and vagus nerve stimulation. Long-term prognosis is often poor, with many experiencing ongoing seizures and intellectual disability.",
        ],
      },
      {
        heading: "ESES Syndrome (Electrical Status Epilepticus During Sleep)",
        paragraphs: [
          "A childhood syndrome, typically occurring between ages 2–12 (peak 3–5), characterized by nearly continuous spike-wave discharges during slow-wave sleep, often leading to cognitive regression, behavioral problems, and motor impairment, sometimes with seizures. Related conditions include Landau-Kleffner Syndrome and Continuous Spike and Wave during Sleep (CSWS). Possible contributing factors include structural brain abnormalities, genetic predisposition, and immune system dysregulation. Treatment involves antiepileptic medications such as benzodiazepines and corticosteroids, with close monitoring of cognitive function.",
        ],
      },
      {
        heading: "Landau-Kleffner Syndrome (LKS)",
        paragraphs: [
          "Also known as acquired epileptic aphasia, this rare disorder causes a sudden or gradual loss of language skills in children, often accompanied by seizures and behavioral problems. Onset is typically between ages 3–7, though it can occur as early as 18 months. The exact cause is unknown but may relate to genetic mutations, particularly in the GRIN2A gene. Diagnosis can be challenging as symptoms may mimic autism or hearing loss; EEG is essential for evaluation. There is no cure, but early diagnosis and treatment — including medication and speech/language therapy — can lead to meaningful progress.",
        ],
      },
      {
        heading: "Progressive Myoclonus Epilepsies (PMEs)",
        paragraphs: [
          "A group of rare, inherited neurodegenerative diseases characterized by myoclonus, epilepsy, and progressive neurological deterioration, often beginning in childhood or adolescence. Myoclonus can be triggered by action, light, or sound. Symptoms worsen over time, affecting motor skills, balance, cognition, and quality of life. Treatment focuses on managing seizures and myoclonus alongside supportive care.",
        ],
      },
      {
        heading: "Lafora Disease",
        paragraphs: [
          "A rare, inherited, and ultimately fatal form of progressive myoclonus epilepsy, typically beginning in late childhood or adolescence. It is autosomal recessive, requiring both parents to carry the gene mutation. Symptoms include recurrent seizures (myoclonic, tonic-clonic, and focal), prominent myoclonus, and progressive cognitive decline, along with behavioral changes and speech difficulties. The disease progresses rapidly, with death typically occurring within a decade of onset. It is characterized by the accumulation of abnormal glycogen molecules called Lafora bodies, caused by mutations in the EPM2A or NHLRC1 genes. Diagnosis involves clinical evaluation, EEG, skin biopsy, and genetic testing. There is currently no cure; management focuses on symptomatic and palliative care.",
        ],
      },
      {
        heading: "Neuronal Ceroid Lipofuscinoses (NCLs / Batten Disease)",
        paragraphs: [
          "A group of rare, inherited neurodegenerative lysosomal storage disorders characterized by the accumulation of a waste product called ceroid lipofuscin in brain cells, leading to progressive damage. There are several types, identified as CLN1, CLN2, and so on, each caused by a mutation in a different gene, with variable age of onset and rate of progression. Clinical features include seizures, dementia, visual loss, motor deterioration, and cognitive decline. There is no cure; treatment focuses on symptom management and supportive care.",
        ],
      },
      {
        heading: "Disorders of Neuronal Proliferation",
        paragraphs: [
          "A broader group of neurodevelopmental disorders arising from disruptions in normal brain development during gestation or early childhood. Examples include Autism Spectrum Disorder, ADHD, intellectual disability, learning disabilities, cerebral palsy, epilepsy, and neuronal migration disorders. Causes can include genetic factors, environmental exposures during pregnancy, and complications during pregnancy or birth. Symptoms vary widely and can include developmental delays, difficulty with social interaction and communication, repetitive behaviors, learning difficulties, motor coordination problems, and seizures. Early diagnosis and intervention — including behavioral therapies, medication, and specialized education — are crucial for improving outcomes.",
        ],
      },
      {
        heading: "Disorders of Neuronal Migration",
        paragraphs: [
          "A group of birth defects caused by abnormal migration of neurons during brain development, leading to structural abnormalities and neurological impairments.",
        ],
        list: [
          "Lissencephaly: a smooth brain surface due to absent normal folds and grooves",
          "Schizencephaly: clefts or splits in the brain, often lined with misplaced or improperly folded cells",
          "Heterotopia: neurons form clumps instead of migrating to their intended locations",
          "Polymicrogyria: an excessive number of abnormally small folds, creating an irregular cortical surface",
          "Agenesis of the corpus callosum: the connection between the two halves of the brain fails to form properly",
          "Pachygyria: abnormally thick gyri",
          "Porencephaly: cysts or fluid-filled spaces in the brain",
        ],
      },
      {
        heading: "In Summary",
        paragraphs: [
          "Epilepsy is not a single condition but a broad category covering many distinct syndromes, each with its own age of onset, seizure pattern, EEG signature, and prognosis. Accurate diagnosis — often supported by EEG and, where needed, imaging or genetic testing — is essential for choosing the right treatment approach and understanding what to expect. If you or a loved one are experiencing recurrent seizures, a proper evaluation is the first step toward effective management.",
        ],
      },
    ],
  },
];
