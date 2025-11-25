-- Create enum for vote modes
CREATE TYPE public.vote_mode AS ENUM ('single', 'multiple', 'ranked');

-- Create enum for event status
CREATE TYPE public.event_status AS ENUM ('draft', 'active', 'paused', 'completed');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  category TEXT NOT NULL,
  number_of_items INTEGER NOT NULL DEFAULT 0,
  vote_mode public.vote_mode NOT NULL DEFAULT 'single',
  number_of_choices INTEGER NOT NULL DEFAULT 1,
  number_of_winners INTEGER NOT NULL DEFAULT 1,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status public.event_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create items table
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  creator TEXT,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create voters table
CREATE TABLE public.voters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  voter_code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  voted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create votes table
CREATE TABLE public.event_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES public.voters(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  rank INTEGER,
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Admins can manage events"
  ON public.events
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active events"
  ON public.events
  FOR SELECT
  USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));

-- Items policies
CREATE POLICY "Admins can manage items"
  ON public.items
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view items for active events"
  ON public.items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = items.event_id
      AND (events.status = 'active' OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- Voters policies
CREATE POLICY "Admins can manage voters"
  ON public.voters
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Event votes policies
CREATE POLICY "Admins can view all votes"
  ON public.event_votes
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Voters can insert their own votes"
  ON public.event_votes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view vote results"
  ON public.event_votes
  FOR SELECT
  USING (true);

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update item vote count
CREATE OR REPLACE FUNCTION public.update_item_vote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.items 
    SET votes = votes + 1 
    WHERE id = NEW.item_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.items 
    SET votes = votes - 1 
    WHERE id = OLD.item_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER update_item_votes_trigger
  AFTER INSERT OR DELETE ON public.event_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_item_vote_count();