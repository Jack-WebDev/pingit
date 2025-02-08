import { Factory as BaseFactory, createFactory as createBaseFactory } from '@pingit/datakit';

// import { userBuilder } from '~/account/builder';
// import { addressBuilder } from '~/address/builder';
// import { clientBuilder } from '~/auth/builder';
import { Context } from '~/context';
// import { attachmentBuilder } from '~/documents/builder';
// import { educationBuilder } from '~/education/builder';
// import { experienceBuilder } from '~/experience/builder';
// import { questionBuilder } from '~/question/builder';
import { typeSeeds } from '~/type/builder';
// import { applicantBuilder } from '~/applicant/builder';

const builders = {
  // attachment: attachmentBuilder,
  // client: clientBuilder,
  // user: userBuilder,
  // address: addressBuilder,
  // applicant: applicantBuilder,
  // question: questionBuilder,
  // education: educationBuilder,
  // experience: experienceBuilder,
};

const seeds = {
  types: typeSeeds,
};

export type Factory = BaseFactory<typeof builders, typeof seeds>;

export function createFactory(ctx: Context): Factory {
  return createBaseFactory(builders, seeds, ctx);
}
