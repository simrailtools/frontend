import type { PointInfoDto, SimRailServerDto } from "@/api/generated";
import { findPointByNameOptions, listServersOptions } from "@/api/generated/@tanstack/react-query.gen.ts";
import { Heading } from "@/components/Heading.tsx";
import { Throbber } from "@/components/Throbber.tsx";
import { Button } from "@/components/form/Button.tsx";
import { RangeInput } from "@/components/form/RangeInput.tsx";
import { SelectInput } from "@/components/form/SelectInput.tsx";
import { ToggleInput } from "@/components/form/ToggleInput.tsx";
import { cn } from "@/lib/utils.ts";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { type FC, useEffect, useState } from "react";

type BoardSelectFormProps = {
  timeSpan: number;
  onlyPassengerTrains: boolean;
  sortOrder: "schedule" | "realtime";
};

type BoardSelectFormFields = {
  point?: PointInfoDto;
  server?: SimRailServerDto;
  timeSpan: number;
  onlyPassengerTrains: boolean;
  sortOrder: "schedule" | "realtime";
};

export const BoardSelectForm: FC<BoardSelectFormProps> = ({ timeSpan, onlyPassengerTrains, sortOrder }) => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      timeSpan,
      sortOrder,
      onlyPassengerTrains,
    } as BoardSelectFormFields,
    onSubmit: async ({ value }) =>
      navigate({
        to: "/boards",
        search: {
          serverId: value.server?.id,
          pointId: value.point?.id,
          onlyPassengerTrains: value.onlyPassengerTrains,
          timeSpan: value.timeSpan,
          sortOrder: value.sortOrder,
        },
      }),
  });

  //
  const selectedPoint = useStore(form.store, state => state.values.point);
  const [pointInputValue, setPointInputValue] = useState("");
  const [pointSearchTerm, setPointSearchTerm] = useState(pointInputValue);
  const [showPointSuggestions, setShowPointSuggestions] = useState(false);
  useEffect(() => {
    if (selectedPoint) {
      setShowPointSuggestions(false);
      setPointInputValue(selectedPoint.name);
    }
  }, [selectedPoint]);
  useEffect(() => {
    const timeoutId = setTimeout(() => setPointSearchTerm(pointInputValue), 500);
    return () => clearTimeout(timeoutId);
  }, [pointInputValue]);

  const { data: pointSuggestions = [] } = useQuery({
    ...findPointByNameOptions({ path: { searchQuery: pointSearchTerm }, query: { limit: 10 } }),
    placeholderData: prev => prev,
    enabled: showPointSuggestions && pointSearchTerm.length >= 3,
  });
  const { data: servers, isLoading: isServersLoading } = useQuery({
    ...listServersOptions({ query: { includeOffline: true } }),
  });

  if (isServersLoading) {
    return <Throbber />;
  }
  if (!servers) {
    throw new Error("Unable to load server list from backend");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Heading level={1} className={"flex justify-center whitespace-nowrap"}>
          Board Select
        </Heading>
        <form
          onSubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className={"flex flex-col space-y-4 mt-6"}>
            <form.Field
              name={"server"}
              validators={{ onChange: ({ value }) => (!value ? "A server must be selected" : undefined) }}
            >
              {field => (
                <div>
                  <label htmlFor={field.name} className={"text-black font-medium tracking-tighter"}>
                    Server:
                  </label>
                  <SelectInput
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value?.id ?? ""}
                    onChange={event => field.handleChange(servers.find(server => server.id === event.target.value))}
                    className={cn(field.state.meta.errors.length && "outline outline-red-600 disabled:text-white")}
                  >
                    <option value={""} disabled={true}>
                      Select Server...
                    </option>
                    {servers
                      .sort((left, right) => left.code.localeCompare(right.code))
                      .map(server => (
                        <option key={server.id} value={server.id}>
                          {server.code}
                        </option>
                      ))}
                  </SelectInput>
                </div>
              )}
            </form.Field>
            <form.Field
              name={"point"}
              validators={{ onChange: ({ value }) => (!value ? "A point must be selected" : undefined) }}
            >
              {field => (
                <div className={"relative"}>
                  <label htmlFor={field.name} className={"text-black font-medium tracking-tighter"}>
                    Point:
                  </label>
                  <input
                    type="text"
                    autoComplete={"off"}
                    inputMode={"search"}
                    className={cn(
                      "block w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 placeholder:text-gray-800",
                      "text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-400 transition",
                      field.state.meta.errors.length && "outline outline-red-600",
                    )}
                    placeholder="Search Points..."
                    value={pointInputValue}
                    onBlur={field.handleBlur}
                    onChange={event => {
                      setShowPointSuggestions(true);
                      setPointInputValue(event.target.value);
                      field.setValue(undefined);
                    }}
                  />
                  {showPointSuggestions && pointSuggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow max-h-60 overflow-auto z-10">
                      {pointSuggestions.map(item => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => field.setValue(item)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name={"timeSpan"}>
              {field => (
                <div>
                  <label htmlFor={field.name} className={"text-black font-medium tracking-tighter"}>
                    Lookahead (in Minutes):
                  </label>
                  <RangeInput
                    id={field.name}
                    min={15}
                    max={180}
                    step={15}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.valueAsNumber)}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name={"onlyPassengerTrains"}>
              {field => (
                <div className={"flex items-center space-x-4"}>
                  <label htmlFor={field.name} className={"text-black font-medium tracking-tighter"}>
                    Only Display Passenger Trains:
                  </label>
                  <ToggleInput
                    id={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.checked)}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name={"sortOrder"}>
              {field => (
                <div className={"flex items-center space-x-4"}>
                  <label htmlFor={field.name} className={"text-black font-medium tracking-tighter"}>
                    Sort By Best Known Time Information:
                  </label>
                  <ToggleInput
                    id={field.name}
                    checked={field.state.value === "realtime"}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.checked ? "realtime" : "schedule")}
                  />
                </div>
              )}
            </form.Field>
            <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type={"submit"} disabled={!canSubmit} className={"mt-2"}>
                  {isSubmitting ? "..." : "Display Board"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
};
